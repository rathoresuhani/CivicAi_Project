import uuid
from datetime import datetime

from app.core.database import database

async def create_complaint_service(payload):
  complaint_id = f"COMP-{uuid.uuid4().hex[:8].upper()}"
  complaint_data={
    "complaint_id":complaint_id,
    "email": payload.email,
    "raw_description": payload.raw_description,
    "raw_image_url": payload.raw_image_url,
    "latitude": payload.latitude,
    "longitude": payload.longitude,
    "status": "pending",
    "created_at": datetime.utcnow()
  }
  await database["complaints"].insert_one(complaint_data)
  return {
    "complaint_id": complaint_id
  }

async def get_complaint_id_by_service(complaint_id:str):
  complaint = await database["complaints"].find_one({
    "complaint_id": complaint_id},
    {"_id":0}
    )
  
  async def get_complaint_by_email_service(email:str):
    cursor = database["complaints"].find(
      {"email": email},
      {"_id":0}
    )

    return await cursor.to_list(length=None)
  
  async def update_complaint_status_service(complaint_id:str, status:str):
    result = await database["complaints"].update_one(
       {"complaint_id": complaint_id},
       {
         "$set":{
           "status":status,
           "updated_at":datetime.utcnow()
         }
       }
    )