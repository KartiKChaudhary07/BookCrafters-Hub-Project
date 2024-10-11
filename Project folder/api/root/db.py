from config import MONGO_URI, MONGO_DATABASE
from pymongo import MongoClient
from config import MONGO_URI, MONGO_DATABASE


def connect_mongodb(uri, db_name):
    client = MongoClient(uri)
    db = client[db_name]
    return db


mdb = connect_mongodb(MONGO_URI, MONGO_DATABASE)
