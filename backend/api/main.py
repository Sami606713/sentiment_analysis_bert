from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request
from api.routers import sentiment

app = FastAPI(title="Sentiment Analysis API", version="0.1.0")

# Mount static files (CSS, JS) from the templates directory
app.mount("/static", StaticFiles(directory="api/templates"), name="static")

templates = Jinja2Templates(directory="api/templates")

# Include the sentiment router under /api prefix
app.include_router(sentiment.router, prefix="/api")

@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=True)
