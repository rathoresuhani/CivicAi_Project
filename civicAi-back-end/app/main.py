from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.complaint_route import router as complaint_router

app = FastAPI(title="CivicAi Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(complaint_router)

@app.get("/")
async def root():
    return {"message": "CivicAi backend is running"}
