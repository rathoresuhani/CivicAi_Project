from fastapi import APIRouter, Header
import os
from datetime import datetime
from fastapi import HTTPException

import uuid

from app.schema.complaint_schema import (
  ComplaintCreateSchema,
  ComplaintStatusUpdateSchema,
  ComplaintPriorityUpdateSchema
)
from app.services.complaint_service import (
  create_complaint_service,
  get_complaint_id_by_service,
  get_complaints_by_email_service,
  update_complaint_status_service,
  update_complaint_priority_service
)

from app.core.database import database

router = APIRouter()

@router.post("/complaints")
async def create_complaint(payload: ComplaintCreateSchema):
  result = await create_complaint_service(payload)
  return {
    "message": "Complaint registered Successfully",
    "complaint_id": result["complaint_id"],
    "priority":result["priority"]
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
   complaints = await get_complaints_by_email_service(email)
   return {
        "email": email,
        "total_complaints": len(complaints),
        "complaints": complaints
    }

@router.patch("/complaints/{complaint_id}/status")
async def update_complaint_status(complaint_id: str, payload: ComplaintStatusUpdateSchema, x_admin_key: str = Header(...)):
    ADMIN_KEY = os.getenv("ADMIN_SECRET_KEY")

    if x_admin_key != ADMIN_KEY:
       raise HTTPException(
          status_code=403,
          detail="Forbidden: Invalid admin key"
       )
    updated_status,reason = await update_complaint_status_service(complaint_id, payload.status)

    if reason=="not_Found":
      raise HTTPException(
        status_code=404,
        detail="Complaint not found"
      )
    if reason=="already_resolved":
      raise HTTPException(
        status_code=400,
        detail="Complaint is already resolved and cannot be updated"
      )
    if reason == "invalid_transition":
        raise HTTPException(
            status_code=400,
            detail="Invalid status transition"
        )

    if not updated_status:
       raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )
    return {
      "message": "Complaint status updated successfully",
      "complaint_id": complaint_id,
      "new_status": payload.status
    }

@router.patch("/complaints/{complaint_id}/priority")
async def update_complaint_priority_service(
  complaint_id:str,
  payload: ComplaintPriorityUpdateSchema,
  x_admin_key: str = Header(...)
):
  ADMIN_KEY = os.getenv("ADMIN_SECRET_KEY")
  if x_admin_key != ADMIN_KEY:
    raise HTTPException(
        status_code=403,
        detail="Forbidden: Invalid admin key"
    )
    updated_priority, reason = await update_complaint_priority_service(
        complaint_id,
        payload.priority
    )
    if reason == "not_found":
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
    )
    if reason == "already_resolved":
        raise HTTPException(
            status_code=400,
            detail="Resolved complaint priority cannot be changed"
    )
    return {
        "message": "Complaint priority updated successfully",
        "complaint_id": complaint_id,
        "new_priority": updated_priority
    }