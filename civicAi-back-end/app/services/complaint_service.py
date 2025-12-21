import uuid
from datetime import datetime

from app.core.database import database

async def create_complaint_service(payload):
  complaint_id = f"COMP-{uuid.uuid4().hex[:8].upper()}"
  priority, priority_color = calculate_priority(payload.raw_description)
  complaint_data={
    "complaint_id":complaint_id,
    "email": payload.email,
    "raw_description": payload.raw_description,
    "raw_image_url": payload.raw_image_url,
    "latitude": payload.latitude,
    "longitude": payload.longitude,
    "priority": priority,
    "priority_color": priority_color,
    "status": "pending",
    "created_at": datetime.utcnow()
  }
  await database["complaints"].insert_one(complaint_data)
  return {
    "complaint_id": complaint_id,
    "priority": priority
  }
  

async def get_complaint_id_by_service(complaint_id:str):
  complaint = await database["complaints"].find_one({
    "complaint_id": complaint_id},
    {"_id":0}
    )
  return complaint
  
async def get_complaints_by_email_service(email:str):
    cursor = database["complaints"].find(
      {"email": email},
      {"_id":0}
    )

    return await cursor.to_list(length=None)
  
async def update_complaint_status_service(complaint_id:str, status:str, admin_remark: str | None = None):
  complaint = await database["complaints"].find_one(
    {"complaint_id":complaint_id}
  )
  if not complaint:
    return None,"not Found"

  current_status = complaint.get("status")

  if current_status == "resolved":
    return None,"already_resolved"


  allowed_transitions = {
      "pending": ["in_progress"],
      "in_progress": ["resolved"]
    }

  if status not in allowed_transitions.get(current_status, []):
        return None, "invalid_transition"

  update_data = {
        "status": status,
        "updated_at": datetime.utcnow()
    }
  if status == "resolved":
      update_data["admin_remark"] = admin_remark
      update_data["resolved_at"] = datetime.utcnow()

  await database["complaints"].update_one(
      {"complaint_id": complaint_id},
      {
         "$set":{
           "updated_at":datetime.utcnow()
         }
       }
    )
  return status, "updated"

def calculate_priority(description:str):
  if not description:
    return "low","green"
    
  text = description.lower()

  high_keywords = ["pothole", "accident", "sewage", "fire", "collapse"]
  medium_keywords = ["garbage", "overflow", "water", "leakage"]

  for word in high_keywords:
    if word in text:
      return "high","red"
    
  for word in medium_keywords:
    if word in text:
      return "medium","yellow"

  return "low","green"

async def update_complaint_priority_service(complaint_id: str, new_priority: str):
    complaint = await database["complaints"].find_one(
        {"complaint_id": complaint_id}
    )

    if not complaint:
        return None, "not_found"

    if complaint.get("status") == "resolved":
        return None, "already_resolved"

    priority_color_map = {
        "high": "red",
        "medium": "yellow",
        "low": "green"
    }

    await database["complaints"].update_one(
        {"complaint_id": complaint_id},
        {
            "$set": {
                "priority": new_priority,
                "priority_color": priority_color_map[new_priority],
                "updated_at": datetime.utcnow()
            }
        }
    )

    return new_priority, "updated"
