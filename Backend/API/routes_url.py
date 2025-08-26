from fastapi import APIRouter
from pydantic import BaseModel

class UrlRequest(BaseModel):
    url: str

router = APIRouter()

@router.post("/check")
async def check_url(request: UrlRequest):
    """
    Endpoint to scrape a URL and check for fake news.
    """
    # TODO: Call scraper (BeautifulSoup / Selenium) + NLP
    result = {
        "url": request.url,
        "title": "Example News Headline",
        "label": "fake",
        "confidence": 0.76,
        "correction": "Verified sources state that this claim is false."
    }
    return result
