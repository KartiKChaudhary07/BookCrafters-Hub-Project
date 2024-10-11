from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from functools import wraps
from root.db import mdb
from root.general.commonUtilis import strToMongoId


def validate_auth(optional=False, roles=None):
    def decorator(fn):
        @jwt_required(optional=optional)
        @wraps(fn)
        def wrapper(*args, **kwargs):
            suid = None
            suser = None
            try:
                identity = None  
                if optional:
                    auth_header = request.headers.get("Authorization")
                    if auth_header:
                        identity = get_jwt_identity()
                        if identity is None:
                            return jsonify({"message": "Invalid JWT token"}), 401
                else:
                    identity = get_jwt_identity()
            except Exception as e:
                return jsonify({"message": str(e)}), 500

            if identity:
                suid = identity
                if suid:
                    suser = mdb.users.find_one({"_id": strToMongoId(suid['uid'])})

                    if roles and suser:
                        user_role = suser.get('role')
                        if user_role not in roles:
                            return jsonify({"message": "Access denied. Admins only."}), 403

            return fn(*args, suid=suid, suser=suser, **kwargs)

        return wrapper

    return decorator