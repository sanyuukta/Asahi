import os
import sys
import datetime
import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

# Fix Windows console unicode encoding
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from contextlib import asynccontextmanager
from db import init_db, get_db
from routes.enquiry_routes import router as enquiry_router
from routes.admin_routes import router as admin_router
from routes.book_routes import router as book_router

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("=================================")
    print("[INFO] Initializing Python FastAPI Server...")
    init_db()
    print("=================================")
    yield

app = FastAPI(
    title="ASAHI Bilingual Services API (Python)",
    description="High-performance FastAPI backend for ASAHI Japanese Learning Academy",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for uploads if any
uploads_dir = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")

# Include Routers
app.include_router(enquiry_router)
app.include_router(admin_router)
app.include_router(book_router)

@app.get("/")
async def root():
    return {
        "success": True,
        "message": "ASAHI Python Backend Running Successfully (FastAPI)"
    }

@app.get("/api/status")
async def status():
    database_status = "connected"
    try:
        db = get_db()
        if db is None:
            database_status = "disconnected"
    except Exception:
        database_status = "disconnected"

    return {
        "success": True,
        "server": "running (Python FastAPI)",
        "database": database_status,
        "time": datetime.datetime.now(datetime.timezone.utc).isoformat()
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
