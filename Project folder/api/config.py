# ❌❌❌ Caution ❌❌❌
# Rename this file to config.py and update the values as per your requirements.
# Do not commit this config.py file to the repository.
# Ensure that the config.py file is added to the .gitignore file.

import datetime
import json
import os
from bson.objectid import ObjectId
import bson
from root.static import G_ACCESS_EXPIRES, G_REFRESH_EXPIRES

G_API_URL = "http://localhost:5000"

# ℹ️ It is recommended to use environment variables for the secret key
G_JWT_ACCESS_SECRET_KEY = "ABCDEFGHIJKLMN"
LOCAL_MONGO_URI = "mongodb://localhost:27017"
LOCAL_MONGO_DATABASE = "book-craft"

### Local DB
MONGO_URI = LOCAL_MONGO_URI
MONGO_DATABASE = LOCAL_MONGO_DATABASE

# --------------------- Local Folder Settings----------------------------
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
G_TEMP_PATH = os.path.abspath(os.path.join(ROOT_DIR, "..", "temp"))


class CustomFlaskResponseEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return str(obj)
        elif isinstance(obj, datetime.date):
            return str(obj)
        elif isinstance(obj, ObjectId):
            return str(obj)
        elif isinstance(obj, bson.ObjectId):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


class Config:
    JWT_SECRET_KEY = G_JWT_ACCESS_SECRET_KEY
    JWT_ACCESS_TOKEN_EXPIRES = G_ACCESS_EXPIRES
    JWT_REFRESH_TOKEN_EXPIRES = G_REFRESH_EXPIRES
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ["access", "refresh"]
    PROPAGATE_EXCEPTIONS = True
    TRAP_HTTP_EXCEPTIONS = True
    MAX_CONTENT_LENGTH = 16 * 1000 * 1000
    RESTFUL_JSON = {
        "cls": CustomFlaskResponseEncoder,
    }
