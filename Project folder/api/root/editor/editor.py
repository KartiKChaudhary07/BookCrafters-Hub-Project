from flask import Blueprint, request, jsonify
from root.db import mdb
from bson import ObjectId
from root.general.authUtils import validate_auth
from datetime import datetime

posts_bp = Blueprint('posts', __name__)

posts_collection = mdb["posts"]

def serialize_post(post):
    # Serializing main post content
    serialized_post = {
        "id": str(post["_id"]),
        "title": post["title"],
        "content": post["content"],
        "categoryId": post["categoryId"],
        "createdAt": post["createdAt"],
        "createdBy": post["createdBy"],
    }

    if "previousVersions" in post and post["previousVersions"]:
        serialized_post["previousVersions"] = [
            {
                "title": version["title"],
                "content": version["content"],
                "categoryId": version["categoryId"],
                "updatedAt": version["updatedAt"],
            }
            for version in post["previousVersions"]
        ]

    return serialized_post

@posts_bp.route("/", methods=["GET"])
def get_all_posts():
    try:
        posts = list(posts_collection.find())
        serialized_posts = [serialize_post(post) for post in posts]
        return jsonify({"status": "success", "posts": serialized_posts}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@posts_bp.route("/<string:post_id>", methods=["GET"])
def get_post(post_id):
    try:
        post = posts_collection.find_one({"_id": ObjectId(post_id)})
        if not post:
            return jsonify({"status": "error", "message": "Post not found"}), 404

        serialized_post = serialize_post(post)
        return jsonify({"status": "success", "post": serialized_post}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@posts_bp.route("/", methods=["POST"])
@validate_auth(roles=["reader"])
def create_post(suid=None, suser=None):
    try:
        data = request.get_json()
        title = data.get("title")
        content = data.get("content")
        categoryId = data.get("categoryId")

        if not title or not content or not categoryId:
            return jsonify({"status": "error", "message": "All fields are required"}), 400

        post = {
            "title": title,
            "content": content,
            "categoryId": categoryId,
            "createdAt": datetime.now(),
            "createdBy": {
                "userId": str(suser["_id"]),
                "name": suser["fullName"],
                "email": suser["email"]
            }
        }

        result = posts_collection.insert_one(post)

        return jsonify({
            "status": "success",
            "message": "Post created successfully",
            "postId": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@posts_bp.route("/<string:post_id>", methods=["PUT"])
@validate_auth(roles=["reader"])
def update_post(suid=None, suser=None, post_id=None):
    try:
        if not post_id:
            return jsonify({"status": "error", "message": "Post ID is required"}), 400

        data = request.get_json()
        title = data.get("title")
        content = data.get("content")
        categoryId = data.get("categoryId")

        if not title or not content or not categoryId:
            return jsonify({"status": "error", "message": "All fields are required"}), 400

        post = posts_collection.find_one({"_id": ObjectId(post_id)})

        if not post:
            return jsonify({"status": "error", "message": "Post not found"}), 404

        previous_version = {
            "title": post["title"],
            "content": post["content"],
            "categoryId": post["categoryId"],
            "updatedAt": post.get("updatedAt", post["_id"].generation_time)
        }

        updated_post = {
            "title": title,
            "content": content,
            "categoryId": categoryId,
            "updatedAt": datetime.utcnow(),
        }

        if "previousVersions" not in post:
            post["previousVersions"] = []

        posts_collection.update_one(
            {"_id": ObjectId(post_id)},
            {"$set": updated_post, "$push": {"previousVersions": previous_version}}
        )

        return jsonify({"status": "success", "message": "Post updated successfully"}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@posts_bp.route("/<string:post_id>", methods=["DELETE"])
@validate_auth(roles=["reader"])
def delete_post(suid=None, suser=None, post_id=None):
    try:
        if not post_id:
            return jsonify({"status": "error", "message": "Post ID is required"}), 400

        post = posts_collection.find_one({"_id": ObjectId(post_id)})

        if not post:
            return jsonify({"status": "error", "message": "Post not found"}), 404

        posts_collection.delete_one({"_id": ObjectId(post_id)})

        return jsonify({"status": "success", "message": "Post deleted successfully"}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500