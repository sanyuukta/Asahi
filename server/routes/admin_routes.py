import os
import datetime
from fastapi import APIRouter, HTTPException, Depends, Security
from pydantic import BaseModel
from bson import ObjectId
from db import get_db
from auth import create_token, verify_admin_token

router = APIRouter(prefix="/api/admin", tags=["Admin"])

class AdminLoginRequest(BaseModel):
    email: str
    password: str

def format_doc(doc):
    if doc:
        doc["_id"] = str(doc["_id"])
        if "createdAt" in doc and isinstance(doc["createdAt"], datetime.datetime):
            doc["createdAt"] = doc["createdAt"].isoformat()
        if "updatedAt" in doc and isinstance(doc["updatedAt"], datetime.datetime):
            doc["updatedAt"] = doc["updatedAt"].isoformat()
    return doc

@router.post("/login")
async def admin_login(payload: AdminLoginRequest):
    admin_email = os.getenv("ADMIN_EMAIL", "absindia20@gmail.com")
    admin_pass = os.getenv("ADMIN_PASS", "asahi_admin_123")

    if not payload.email or not payload.password:
        raise HTTPException(status_code=400, detail="Email and password are required")

    if payload.email == admin_email and payload.password == admin_pass:
        token = create_token({"role": "admin", "email": payload.email}, expires_in_days=1)
        return {
            "success": True,
            "message": "Admin login successful",
            "token": token,
            "user": {
                "email": payload.email,
                "role": "admin"
            }
        }

    raise HTTPException(status_code=401, detail="Invalid admin credentials")

@router.get("/dashboard")
async def get_dashboard(admin_payload: dict = Depends(verify_admin_token)):
    try:
        db = get_db()
        users_col = db["users"]
        total_users = users_col.count_documents({})
        return {
            "success": True,
            "analytics": {
                "totalUsers": total_users
            }
        }
    except Exception as e:
        print("❌ DASHBOARD ERROR:", e)
        raise HTTPException(status_code=500, detail="Failed to load dashboard")

@router.get("/users")
async def get_all_users(admin_payload: dict = Depends(verify_admin_token)):
    try:
        db = get_db()
        users_col = db["users"]
        docs = list(users_col.find().sort("createdAt", -1))
        formatted_users = [format_doc(d) for d in docs]

        return {
            "success": True,
            "count": len(formatted_users),
            "users": formatted_users
        }
    except Exception as e:
        print("❌ FETCH USERS ERROR:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch users")

@router.delete("/delete-user/{user_id}")
async def delete_user(user_id: str, admin_payload: dict = Depends(verify_admin_token)):
    try:
        db = get_db()
        users_col = db["users"]
        
        try:
            obj_id = ObjectId(user_id)
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid user ID format")

        result = users_col.delete_one({"_id": obj_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Enquiry not found")

        return {
            "success": True,
            "message": "Enquiry deleted successfully"
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        print("❌ DELETE USER ERROR:", e)
        raise HTTPException(status_code=500, detail="Failed to delete enquiry")
