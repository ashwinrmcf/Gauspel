from fastapi import APIRouter
from pydantic import BaseModel

# Request body model
class TextRequest(BaseModel):
    text: str

# Router instance
router = APIRouter()

@router.post("/check")
async def check_text(request: TextRequest):
    """
    Endpoint to check if given text is fake or real.
    """
    # TODO: Call fake_news_nlp.py pipeline here
    result = {
        "input_text": request.text,
        "label": "fake",   # placeholder
        "confidence": 0.87,
        "correction": "According to WHO, COVID-19 is not spread via 5G."
    }
    return result
