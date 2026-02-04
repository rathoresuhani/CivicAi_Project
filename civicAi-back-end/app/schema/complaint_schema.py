from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from typing import Literal


class ComplaintCreateSchema(BaseModel):
  name: str
  email: str
  category: str
  phone: str = Field(..., pattern="^[6-9][0-9]{9}$")
  raw_description: str | None = None
  raw_image_url: str | None = None
  latitude: float | None = None
  longitude: float | None = None

  class Config:
    json_schema_extra={
      "example":{
        "name": "",
        "phone": "",
        "email": "user@gmail.com",
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
        "status":"pending"
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
