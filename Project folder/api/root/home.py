from flask_restful import Resource


class Home(Resource):
    def get(self):
        return {
            "status": 1,
            "cls": "success",
            "msg": "Welcome to the API!",
            "payload": {},
        }
