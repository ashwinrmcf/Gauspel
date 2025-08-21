from fastapi import APIRouter
from . import routes_txt, routes_image, routes_url, routes_utils

api_router = APIRouter()

# Include each route module
api_router.include_router(routes_txt.router, prefix="/text", tags=["Text"])
api_router.include_router(routes_image.router, prefix="/image", tags=["Image"])
api_router.include_router(routes_url.router, prefix="/url", tags=["URL"])
api_router.include_router(routes_utils.router, prefix="/utils", tags=["Utils"])
