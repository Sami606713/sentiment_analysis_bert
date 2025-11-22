# Sentiment Analysis API

A **modular FastAPI application** for sentiment analysis with a clean architecture following best practices.

## 🏗️ Architecture

The project follows a modular design with clear separation of concerns:

```
backend/
├── api/
│   ├── __init__.py
│   ├── main.py              # Application entry point
│   ├── core/                # Core configuration
│   │   ├── __init__.py
│   │   └── config.py        # Settings management
│   ├── routers/             # API endpoints
│   │   ├── __init__.py
│   │   ├── sentiment.py     # Sentiment analysis routes
│   │   └── health.py        # Health check routes
│   ├── schemas/             # Pydantic models
│   │   ├── __init__.py
│   │   └── sentiment.py     # Request/Response schemas
│   └── services/            # Business logic
│       ├── __init__.py
│       └── sentiment_service.py  # Sentiment analysis service
├── requirements.txt         # Python dependencies
└── .env.example            # Environment variables example
```

## ✨ Features

- ✅ **Modular Architecture**: Clean separation of routers, services, schemas, and configuration
- ✅ **Dependency Injection**: Using FastAPI's dependency injection system
- ✅ **Type Safety**: Full Pydantic validation for requests and responses
- ✅ **Async Support**: Built with async/await for better performance
- ✅ **Environment Configuration**: Centralized settings with `.env` support
- ✅ **Health Checks**: Comprehensive health, readiness, and liveness endpoints
- ✅ **API Documentation**: Auto-generated OpenAPI (Swagger) docs
- ✅ **CORS Support**: Configured for cross-origin requests
- ✅ **Batch Processing**: Support for analyzing multiple texts in one request

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
# Copy the example environment file
copy .env.example .env

# Edit .env with your settings (optional)
```

### 3. Run the Application

```bash
# From the backend directory
cd api
python main.py

# Or using uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

## 📚 API Endpoints

### Health Checks

- `GET /api/v1/health` - Health status
- `GET /api/v1/health/ready` - Readiness check
- `GET /api/v1/health/live` - Liveness check

### Sentiment Analysis

- `POST /api/v1/sentiment/analyze` - Analyze single text
- `POST /api/v1/sentiment/analyze/batch` - Analyze multiple texts
- `GET /api/v1/sentiment/model-info` - Get model information

## 🔍 API Examples

### Single Text Analysis

```bash
curl -X POST "http://localhost:8000/api/v1/sentiment/analyze" \
  -H "Content-Type: application/json" \
  -d '{"text": "I absolutely love this product!"}'
```

**Response:**
```json
{
  "text": "I absolutely love this product!",
  "sentiment": {
    "label": "POSITIVE",
    "score": 0.9998
  },
  "processing_time": 0.125,
  "timestamp": "2025-11-22T02:24:22Z"
}
```

### Batch Analysis

```bash
curl -X POST "http://localhost:8000/api/v1/sentiment/analyze/batch" \
  -H "Content-Type: application/json" \
  -d '{
    "texts": [
      "I love this!",
      "This is terrible.",
      "It'\''s okay, nothing special."
    ]
  }'
```

## 📖 Documentation

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🔒 Future Enhancements

Based on your existing RBAC work, you can easily add:

- **Authentication**: JWT token-based authentication
- **Authorization**: Role-based access control (RBAC)
- **Database Integration**: SQLAlchemy models and repositories
- **Caching**: Redis for model and result caching
- **Rate Limiting**: Request throttling per user/API key
- **Logging**: Structured logging with correlation IDs
- **Metrics**: Prometheus metrics for monitoring

## 🧪 Testing

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests (after creating test files)
pytest
```

## 📝 Configuration

All configuration is managed through `api/core/config.py` and can be overridden by environment variables:

- `PROJECT_NAME` - API name
- `ALLOWED_ORIGINS` - CORS allowed origins
- `DEFAULT_MODEL` - HuggingFace model to use
- `SECRET_KEY` - JWT secret key (for future RBAC)
- And more...

## 🛠️ Development

The modular structure makes it easy to:

1. **Add new endpoints**: Create a new router in `api/routers/`
2. **Add business logic**: Create a new service in `api/services/`
3. **Define data models**: Create new schemas in `api/schemas/`
4. **Update configuration**: Modify `api/core/config.py`

## 📄 License

This project is part of the Sentiment Analysis workspace.
