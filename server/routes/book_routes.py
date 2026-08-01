import os
import re
import datetime
import cloudinary
import cloudinary.uploader
from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, Form
from bson import ObjectId
from dotenv import load_dotenv
from db import get_db
from auth import verify_admin_token

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME", "ddvkngvek"),
    api_key=os.getenv("CLOUDINARY_API_KEY", "263333874974917"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET", "FED-2CvnKKiZC7ziAbACJfo5QoQ")
)

router = APIRouter(prefix="/api/books", tags=["Books"])

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text)
    return re.sub(r'-+', '-', text)

def format_doc(doc):
    if doc:
        doc["_id"] = str(doc["_id"])
        if "createdAt" in doc and isinstance(doc["createdAt"], datetime.datetime):
            doc["createdAt"] = doc["createdAt"].isoformat()
        if "updatedAt" in doc and isinstance(doc["updatedAt"], datetime.datetime):
            doc["updatedAt"] = doc["updatedAt"].isoformat()
    return doc

@router.get("")
@router.get("/")
async def get_books():
    try:
        db = get_db()
        books_col = db["books"]
        docs = list(books_col.find().sort("createdAt", -1))
        formatted_books = [format_doc(d) for d in docs]
        return {
            "success": True,
            "count": len(formatted_books),
            "books": formatted_books
        }
    except Exception as e:
        print("❌ BOOK LIST ERROR:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch books")

@router.post("")
@router.post("/")
async def add_book(
    name: str = Form(...),
    description: str = Form(""),
    image: UploadFile = File(...),
    admin_payload: dict = Depends(verify_admin_token)
):
    try:
        if not name or not image:
            raise HTTPException(status_code=400, detail="Book name and image are required")

        db = get_db()
        books_col = db["books"]

        base_slug = slugify(name)
        regex_pattern = f"^{re.escape(base_slug)}"
        existing_count = books_col.count_documents({"slug": {"$regex": regex_pattern}})
        slug = f"{base_slug}-{existing_count + 1}" if existing_count > 0 else base_slug

        contents = await image.read()
        upload_result = cloudinary.uploader.upload(
            contents,
            folder="asahi-books",
            resource_type="image"
        )

        now = datetime.datetime.utcnow()
        book_doc = {
            "name": name.strip(),
            "slug": slug,
            "description": description.strip(),
            "imageUrl": upload_result.get("secure_url"),
            "cloudinaryPublicId": upload_result.get("public_id"),
            "createdAt": now,
            "updatedAt": now
        }

        result = books_col.insert_one(book_doc)
        created_book = books_col.find_one({"_id": result.inserted_id})

        return {
            "success": True,
            "message": "Book added successfully",
            "book": format_doc(created_book)
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        print("❌ ADD BOOK ERROR:", e)
        raise HTTPException(status_code=500, detail="Failed to add book")

@router.delete("/{book_id}")
async def delete_book(book_id: str, admin_payload: dict = Depends(verify_admin_token)):
    try:
        db = get_db()
        books_col = db["books"]

        try:
            obj_id = ObjectId(book_id)
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid book ID format")

        book = books_col.find_one({"_id": obj_id})
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")

        pub_id = book.get("cloudinaryPublicId")
        if pub_id:
            try:
                cloudinary.uploader.destroy(pub_id)
            except Exception as cl_err:
                print("Cloudinary destroy warning:", cl_err)

        books_col.delete_one({"_id": obj_id})

        return {
            "success": True,
            "message": "Book deleted successfully"
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        print("❌ DELETE BOOK ERROR:", e)
        raise HTTPException(status_code=500, detail="Failed to delete book")
