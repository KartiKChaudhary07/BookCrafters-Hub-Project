from flask import request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_restful import Resource

from root.db import mdb
from root.general.commonUtilis import (
    bcryptPasswordHash,
    cleanupEmail,
    maskEmail,
    mdbObjectIdToStr,
    verifyPassword,
)
from root.general.authUtils import validate_auth
from root.static import G_ACCESS_EXPIRES


class Login(Resource):
    def post(self):
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        userMeta = {
            "email": email,
            "password": password,
        }

        return login(userMeta, {})


def login(data, filter, isRedirect=True):
    email = cleanupEmail(data.get("email"))

    filter = {
        "email": email,
        "status": {"$nin": ["deleted", "removed", "suspended"]}
    }

    userDoc = mdb.users.find_one(filter)

    if not userDoc:
        return {
            "status": 0,
            "cls": "error",
            "msg": "Invalid email id or password. Please try again",
        }

    userStatus = userDoc.get("status")
    if userStatus == "pending":
        return {
            "status": 0,
            "cls": "error",
            "msg": "Your request is still pending. Contact admin for more info.",
            "payload": {
                "redirect": "/adminApproval",
                "userMeta": userDoc,
            },
        }

    password = data.get("password")
    if not verifyPassword(userDoc.get("password"), password):
        return {
            "status": 0,
            "cls": "error",
            "msg": "Invalid email id or password. Please try again",
        }

    uid = mdbObjectIdToStr(userDoc["_id"])
    role = userDoc.get("role", "reader")
    access_token = create_access_token(identity={"uid": uid, "role": role}, expires_delta=G_ACCESS_EXPIRES)

    payload = {
        "accessToken": access_token,
        "uid": uid,
        "role": role,
        "redirectUrl": "/",
    }

    return {
        "status": 1,
        "cls": "success",
        "msg": "Login successful. Redirecting...",
        "payload": payload,
    }


class UserLogout(Resource):
    @validate_auth(optional=True)
    def post(self, suid, suser):
        content = request.get_json(silent=True)

        return {
            "status": 1,
            "cls": "success",
            "msg": "Logged out successfully!",
        }


def logLoginSessions(uid, user, isLoggedIn=False, tokens=None, extra={}):
    return {
        "status": 1,
        "cls": "success",
        "msg": "Success",
    }


class UserRegister(Resource):
    @validate_auth(optional=True)
    def post(self, suid, suser):
        input = request.get_json(silent=True)

        email = input["email"]
        currentUser = mdb.users.find_one({"email": email})

        if currentUser and "_id" in currentUser:
            maskedEmail = maskEmail(email)
            return {
                "status": 0,
                "cls": "error",
                "msg": f"Email ID ({maskedEmail}) already exists",
                "payload": {},
            }

        password = input["password"]
        newPassword = bcryptPasswordHash(password)
        avatarUrl = input.get("avatarUrl", "/avatar.svg")
        role = input.get("role", "reader")

        newUser = {
            "fullName": input.get("fullName", ""),
            "email": email,
            "password": newPassword,
            "avatarUrl": avatarUrl,
            "role": role,
            "status": "active",
        }

        mdb.users.insert_one(newUser)

        payload = {
            "ruid": newUser["_id"],
            "redirect": "/login",
        }

        return {
            "status": 1,
            "cls": "success",
            "msg": "Congratulations! You have successfully registered. Please login to continue",
            "payload": payload,
        }


class ForgetPassword(Resource):
    @validate_auth(optional=True)
    def post(self, suid, suser):
        input = request.get_json(silent=True)
        email = input["email"]
        print(input)

        user = mdb.users.find_one({"email": email})

        if not (user and "_id" in user):
            return {
                "status": 0,
                "cls": "error",
                "msg": "User not found",
                "payload": {},
            }

        newPassword = input["password"]
        hashedPassword = bcryptPasswordHash(newPassword)

        mdb.users.update_one(
            {"_id": user["_id"]},
            {"$set": {"password": hashedPassword, "defaultPassword": False}},
        )

        return {
            "status": 1,
            "cls": "success",
            "msg": "Password reset successfully",
            "payload": {},
        }


def role_required(required_role):
    def decorator(func):
        @jwt_required()
        def wrapper(*args, **kwargs):
            claims = get_jwt_identity()
            role = claims.get("role", "reader")
            if role != required_role:
                return {"status": 0, "cls": "error", "msg": "Unauthorized access"}, 403
            return func(*args, **kwargs)
        return wrapper
    return decorator


class AdminOnlyResource(Resource):
    @role_required("admin")
    def post(self):
        return {"status": 1, "msg": "Admin access granted"}


class ReaderResource(Resource):
    @jwt_required()
    def get(self):
        return {"status": 1, "msg": "Access granted for reader or admin"}
