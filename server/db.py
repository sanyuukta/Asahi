import os
import sys
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

primary_uri = os.getenv("MONGO_URI") or os.getenv("MONGODB_URI")
local_fallback_uri = "mongodb://127.0.0.1:27017/asahiDB"

client = None
db = None

def init_db():
    global client, db
    if primary_uri:
        # Try connecting to Atlas with certifi CA bundle first, then fallback parameters
        ssl_configs = []
        try:
            import certifi
            ssl_configs.append({"tlsCAFile": certifi.where(), "serverSelectionTimeoutMS": 6000})
        except Exception:
            pass
        ssl_configs.append({"serverSelectionTimeoutMS": 6000, "tlsAllowInvalidCertificates": True})
        ssl_configs.append({"serverSelectionTimeoutMS": 6000})

        for config in ssl_configs:
            try:
                client = MongoClient(primary_uri, **config)
                client.admin.command('ping')
                try:
                    db = client.get_default_database()
                except Exception:
                    db = client["asahiDB"]
                print("[OK] MongoDB Atlas Connected Successfully")
                return db
            except Exception as err:
                print(f"[WARN] Atlas connection attempt with {config} issue: {err}")

    # Fallback to local MongoDB
    try:
        print("[INFO] Connecting to Local MongoDB (127.0.0.1:27017)...")
        client = MongoClient(local_fallback_uri, serverSelectionTimeoutMS=5000)
        client.admin.command('ping')
        db = client.asahiDB
        print("[OK] Fallback Local MongoDB Connected Successfully!")
        return db
    except Exception as local_err:
        print(f"[ERROR] Fallback Local MongoDB Error: {local_err}")
        return None

def get_db():
    global db
    if db is None:
        db = init_db()
    return db
