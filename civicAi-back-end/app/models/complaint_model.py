from datetime import datetime
from typing import Optional

def complaint_document(
    complaint_id:str,
    email:str,
    raw_description:str,
    raw_image_url:Optional[str],
    latitude:float,
    longitude:float,
    status:str="pending",
    
) -> dict:
  return {
    "complaint_id":complaint_id,
    "email": email,
    "raw_description": raw_description,
    "raw_image_url": raw_image_url,
    "latitude": latitude,
    "longitude": longitude,
    "status": status,
    "created_at": datetime.utcnow(),
    "updated_at": None
  } 