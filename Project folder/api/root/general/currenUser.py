from flask_restful import Resource
from root.db import mdb
from root.general.authUtils import validate_auth
from root.general.commonUtilis import strToMongoId

class CurrentUser(Resource):
    @validate_auth(optional=True)
    def get(self, suid=None, suser=None):
        # If user is not logged in
        if not suid:
            return {"status": 0, "msg": "Not logged in", "payload": {}}

        dbUsers = "users"
        # Fetch the user data based on suid (either by _id or uid)
        data = mdb[dbUsers].find_one(
            {"$or": [{"_id": strToMongoId(suid['uid'])}, {"uid": suid['uid']}]}
        )

        # If user data is not found, return error message
        if not (data and "_id" in data):
            return {"status": 0, "msg": "Not logged in"}

        # Get user details
        userType = data.get("role", "reader")  # Default to 'reader' role if not found
        avatarUrl = data.get("avatarUrl")
        fullName = data.get("fullName")

        # Prepare the user object to be returned
        user = {
            "fullName": fullName,
            "avatarUrl": avatarUrl,
            "userType": userType,  # Return the role (either admin or reader)
            "ruid": data.get("_id", ""),
            "email": data["email"] if "email" in data else "",
            "forceRedirectUrl": data.get("forceRedirectUrl", ""),
            "status": data.get("status"),
        }

        # Customize message based on user type (role)
        if userType == "admin":
            msg = "Admin access granted"
        elif userType == "reader":
            msg = "Reader access granted"
        else:
            msg = "Success"

        # Return success response with user payload
        return {
            "status": 1,
            "msg": msg,
            "payload": user,
        }
