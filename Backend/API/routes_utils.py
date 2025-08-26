from fastapi import APIRouter

router = APIRouter()

@router.get("/ping")
async def ping():
    return {"status": "ok", "message": "Server is alive"}

@router.get("/version")
async def version():
    return {"version": "1.0.0", "app": "Fake News Detector"}
