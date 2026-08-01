import os
import re
import random
import string
import datetime
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from bson import ObjectId
from db import get_db
from auth import hash_password, create_token
from email_service import send_email_async, get_enquiry_template, get_admin_enquiry_template

router = APIRouter(prefix="/api/enquiry", tags=["Enquiry"])

email_regex = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
phone_regex = re.compile(r"^[6-9]\d{9}$")

class EnquiryRequest(BaseModel):
    name: str
    email: str
    password: Optional[str] = None
    phone: Optional[str] = ""
    exam: Optional[str] = ""
    level: Optional[str] = ""
    message: Optional[str] = ""

def generate_random_password() -> str:
    chars = string.ascii_letters + string.digits
    return "".join(random.choice(chars) for _ in range(8)) + "A1@"

def format_doc(doc):
    if doc:
        doc["_id"] = str(doc["_id"])
        if "createdAt" in doc and isinstance(doc["createdAt"], datetime.datetime):
            doc["createdAt"] = doc["createdAt"].isoformat()
        if "updatedAt" in doc and isinstance(doc["updatedAt"], datetime.datetime):
            doc["updatedAt"] = doc["updatedAt"].isoformat()
    return doc

@router.post("/submit")
async def submit_enquiry(payload: EnquiryRequest):
    try:
        name = payload.name.strip() if payload.name else ""
        email = payload.email.strip().lower() if payload.email else ""
        phone = payload.phone.strip() if payload.phone else ""
        password = payload.password or generate_random_password()
        exam = payload.exam or ""
        level = payload.level or ""
        message = payload.message or ""

        if not name or not email:
            raise HTTPException(status_code=400, detail="Name and Email are required")

        if not email_regex.match(email):
            raise HTTPException(status_code=400, detail="Invalid email format")

        if phone and not phone_regex.match(phone):
            raise HTTPException(status_code=400, detail="Enter valid Indian phone number")

        db = get_db()
        users_col = db["users"]

        existing_user = users_col.find_one({"email": email})

        now = datetime.datetime.utcnow()

        if existing_user:
            update_data = {
                "name": name or existing_user.get("name"),
                "phone": phone or existing_user.get("phone"),
                "exam": exam or existing_user.get("exam"),
                "level": level or existing_user.get("level"),
                "message": message or existing_user.get("message"),
                "updatedAt": now
            }
            users_col.update_one({"_id": existing_user["_id"]}, {"$set": update_data})
            enquiry_user = users_col.find_one({"_id": existing_user["_id"]})
        else:
            hashed_pw = hash_password(password)
            user_doc = {
                "name": name,
                "email": email,
                "password": hashed_pw,
                "phone": phone,
                "exam": exam,
                "level": level,
                "message": message,
                "createdAt": now,
                "updatedAt": now
            }
            result = users_col.insert_one(user_doc)
            enquiry_user = users_col.find_one({"_id": result.inserted_id})

        user_id_str = str(enquiry_user["_id"])
        token = create_token({"id": user_id_str}, expires_in_days=365)

        # Send User Confirmation Email
        user_html = get_enquiry_template(name, email, phone, exam, level, message)
        send_email_async(email, "Thank You for Contacting ASAHI Japanese Learning", user_html)

        # Send Admin Email
        admin_email = os.getenv("ADMIN_EMAIL", "sanyukta.tiwari20@gmail.com")
        admin_html = get_admin_enquiry_template(name, email, phone, exam, level, message)
        send_email_async(admin_email, f"Action Required: New Enrollment Enquiry - {name}", admin_html)

        formatted_enquiry = format_doc(enquiry_user)

        return {
            "success": True,
            "message": "Enquiry submitted successfully",
            "token": token,
            "enquiry": formatted_enquiry
        }

    except HTTPException as he:
        raise he
    except Exception as e:
        print("❌ ENQUIRY ERROR:", e)
        raise HTTPException(status_code=500, detail="Something went wrong. Please try again later.")
