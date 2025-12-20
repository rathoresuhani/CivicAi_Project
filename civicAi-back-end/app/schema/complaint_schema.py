from pydantic import BaseModel, EmailStr
from typing import Optional

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
  status: ["pending","in progress","resolved"]

  class config:
    json_schema_extra = {
      "example":{
        "status":"in progress"
      }
    }