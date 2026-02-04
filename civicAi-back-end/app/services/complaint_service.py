import uuid
from datetime import datetime, timedelta
from app.core.database import database


async def create_complaint_service(payload):
    complaint_id = f"COMP-{uuid.uuid4().hex[:8].upper()}"

    complaint_data = {
        "complaint_id": complaint_id,
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "category": payload.category,
        "raw_description": payload.raw_description,
        "raw_image_url": payload.raw_image_url,
        "latitude": payload.latitude,
        "longitude": payload.longitude,
        "priority": "medium",
        "status": "pending",
        "created_at": datetime.utcnow(),
    }

    await database["complaints"].insert_one(complaint_data)

    return {
        "complaint_id": complaint_id,
        "priority": "medium"
    }


async def get_complaint_id_by_service(complaint_id: str):
    complaint = await database["complaints"].find_one(
        {"complaint_id": complaint_id},
        {"_id": 0}
    )
    return complaint


async def get_complaint_by_email_service(email: str):
    cursor = database["complaints"].find(
        {"email": email},
        {"_id": 0}
    )
    return await cursor.to_list(length=None)


async def update_complaint_status_service(complaint_id: str, status: str):
    complaint = await database["complaints"].find_one(
        {"complaint_id": complaint_id}
    )

    if not complaint:
        return None

    if complaint.get("status") == "resolved":
        return None

    await database["complaints"].update_one(
        {"complaint_id": complaint_id},
        {
            "$set": {
                "status": status,
                "updated_at": datetime.utcnow()
            }
        }
    )

    return status


async def update_complaint_priority_service(complaint_id: str, priority: str):
    complaint = await database["complaints"].find_one(
        {"complaint_id": complaint_id}
    )

    if not complaint:
        return None

    if complaint.get("status") == "resolved":
        return None

    await database["complaints"].update_one(
        {"complaint_id": complaint_id},
        {"$set": {"priority": priority}}
    )

    return priority


async def get_admin_complaints_service(
    status: str | None = None,
    priority: str | None = None,
    days: int | None = None
):
    query = {}

    if status:
        query["status"] = status

    if priority:
        query["priority"] = priority

    if days:
        since_date = datetime.utcnow() - timedelta(days=days)
        query["created_at"] = {"$gte": since_date}

    complaints = await database["complaints"].find(
        query,
        {"_id": 0}
    ).to_list(length=100)

    return complaints
