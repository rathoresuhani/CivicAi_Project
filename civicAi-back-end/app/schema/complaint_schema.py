from pydantic import BaseModel, EmailStr
from typing import Optional
from typing import Literal


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

  class Config:
    json_schema_extra = {
      "example":{
        "status":"in_progress"
      }
    }

class ComplaintPriorityUpdateSchema(BaseModel):
  priority: Literal["low", "medium", "high"]

  class Config:
    json_schema_extra = {
      "example":{
        "priority":"medium"
      }
    }
