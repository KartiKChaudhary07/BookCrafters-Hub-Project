from . import dashboard_api

from .dashboard import Testing
dashboard_api.add_resource(Testing, "/testing")
