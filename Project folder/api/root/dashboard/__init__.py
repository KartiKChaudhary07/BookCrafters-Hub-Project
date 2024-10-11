from flask import Blueprint
from flask_restful import Api


dashboard_bp = Blueprint("dashboard", __name__)
dashboard_api = Api(dashboard_bp)

from . import __routes__