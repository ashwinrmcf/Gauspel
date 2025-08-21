from fastapi import APIRouter, File, UploadFile

router = APIRouter()

@router.post("/check")
async def check_image(file: UploadFile = File(...)):
    """
    Endpoint to check if an uploaded image contains misinformation.
    """
    # TODO: Call OCR + NLP + image_checker
    result = {
        "filename": file.filename,
        "text_extracted": "Sample extracted text",
        "label": "real",
        "confidence": 0.92
    }
    return result
