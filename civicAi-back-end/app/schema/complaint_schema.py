from pydantic import BaseModel, EmailStr
from typing import Literal, Optional

class ComplaintCreateSchema(BaseModel):
  email: EmailStr
  raw_description: str
  raw_image_url: Optional[str] = None
  latitude: float
  longitude: float

  class Config:
    json_schema_extra={
      "example":{
        "email":"user@gmail.com",
        "raw_description": "Garbage is overflowing near my house",
        "raw_image_url": "image.jpg",
        "latitude": 28.6139,
        "longitude": 77.2090
      }

    }

class ComplaintStatusUpdateSchema(BaseModel):
  status: Literal["pending","in_progress","resolved"]
  admin_remark: Optional[str] = None

  class Config:
    json_schema_extra = {
      "example":{
        "status":"in_progress",
        "admin_remark":"Pothole repaired by muncipal department"
      }
    }

class ComplaintPriorityUpdateSchema(BaseModel):
    priority: Literal["high", "medium", "low"]

    class Config:
        json_schema_extra = {
            "example": {
                "priority": "high"
            }
        }