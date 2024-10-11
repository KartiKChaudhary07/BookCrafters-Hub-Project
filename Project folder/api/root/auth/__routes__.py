from root.auth.auth import ForgetPassword, Login, UserRegister
from root.general.currenUser import CurrentUser
from . import auth_api

auth_api.add_resource(Login, "/api/login")
auth_api.add_resource(UserRegister, "/api/register")
auth_api.add_resource(ForgetPassword, "/api/forget/password")
# auth_api.add_resource(UserLogout, "/api/user/logout")
auth_api.add_resource(CurrentUser, "/api/currentUser")

