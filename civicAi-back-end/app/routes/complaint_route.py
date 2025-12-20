from fastapi import APIRouter
from datetime import datetime
from fastapi import HTTPException

import uuid

from app.schema.complaint_schema import ComplaintCreateSchema
from app.services.complaint_service import (
  create_complaint_service,
  get_complaint_id_by_service,
  get_complaint_by_email_service
)

from app.core.database import database

router = APIRouter()

@router.post("/complaints")
async def create_complaint(payload: ComplaintCreateSchema):
  complaint_id = await create_complaint_service(payload)
  return {
    "message": "Complaint registered Successfully",
    "complaint_id": complaint_id
  }

@router.get("/complaints/{complaint_id}")
async def track_complaint(complaint_id: str):
  complaint = await get_complaint_id_by_service(complaint_id)
  if not complaint:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

  return complaint

@router.get("/complaints/email/{email}")
async def track_all_complaint_by_email(email:str):
   complaints = await get_complaint_by_email_service(email)
   return {
        "email": email,
        "total_complaints": len(complaints),
        "complaints": complaints
    }