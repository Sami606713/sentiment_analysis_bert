from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from api.utils.utils import  predict_sentiment

router = APIRouter()

class SentimentRequest(BaseModel):
    text: str

@router.post("/sentiment")
async def get_sentiment(request: SentimentRequest):
    result = predict_sentiment(request.text)
    return JSONResponse(content={"label": result})

