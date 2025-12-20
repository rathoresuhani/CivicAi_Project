from fastapi import FastAPI
from app.routes.complaint_route import router as complaint_router

app = FastAPI(title="CivicAi Backend")

app.include_router(complaint_router)


@app.get("/")
async def root():
    return {
        "message": "CivicAi backend is running"
    }
