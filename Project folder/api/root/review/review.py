from flask import Blueprint, request, jsonify
from root.db import mdb
from bson import ObjectId

reviews_bp = Blueprint('reviews_bp', __name__)

@reviews_bp.route('/api/posts/<string:post_id>/reviews', methods=['GET'])
def get_reviews(post_id):
    post = mdb.posts.find_one({"_id": ObjectId(post_id)})
    if not post:
        return jsonify({"message": "Post not found"}), 404

    reviews = list(mdb.reviews.find({"post_id": post_id}))
    print(reviews)
    reviews = [{"reviewText": review["reviewText"], "rating": review["rating"], "post_id": str(review["post_id"]), "_id": str(review["_id"]), "reviewer": review["reviewer"]} for review in reviews]
    return jsonify({"reviews": reviews}), 200

@reviews_bp.route('/api/posts/<string:post_id>/reviews', methods=['POST'])
def add_review(post_id):
    data = request.get_json()
    review_text = data.get('reviewText')
    rating = data.get('rating')
    reviewer = data.get('reviewer')

    if not review_text or not rating:
        return jsonify({"message": "Review text and rating are required"}), 400

    review = {
        "post_id": str(post_id),
        "reviewText": review_text,
        "rating": rating,
        "reviewer": reviewer
    }

    mdb.reviews.insert_one(review)
    return jsonify({"message": "Review added successfully"}), 201