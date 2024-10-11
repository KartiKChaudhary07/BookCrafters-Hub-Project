from flask_restful import Resource


class Testing(Resource):
    def get(self):
        return {
            "status": 1,
            "cls": "success",
            "msg": "Test successfully completed",
            "payload": {}
        }