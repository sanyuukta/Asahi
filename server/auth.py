import os
import datetime
import jwt
import bcrypt
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET", "asahi_super_secret")
security = HTTPBearer(auto_error=False)

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt(10)
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except Exception:
        return False

def create_token(payload: dict, expires_in_days: int = 365) -> str:
    data = payload.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(days=expires_in_days)
    data.update({"exp": expire})
    token = jwt.encode(data, JWT_SECRET, algorithm="HS256")
    return token

def verify_admin_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    if not credentials or not credentials.credentials:
        raise HTTPException(status_code=401, detail="No token provided")
    
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        if payload.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Not authorized as admin")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
