import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReadWriting = () => {
  const { id } = useParams();
  const [writing, setWriting] = useState({});
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [previousVersions, setPreviousVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);

  const fetchPost = async () => {
    const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      setWriting(data.post);
      setPreviousVersions(data.post.previousVersions || []);
    }
  };

  const fetchReviews = async () => {
    const res = await fetch(`http://localhost:5000/api/posts/${id}/reviews`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data.reviews);

      setReviews(data.reviews);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const reviewData = { reviewText, rating, reviewer: writing.createdBy?.name };

    const res = await fetch(`http://localhost:5000/api/posts/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (res.ok) {
      setReviewText("");
      setRating(0);
      fetchReviews();
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost();
      fetchReviews();
    }
  }, [id]);

  const handleVersionChange = (e) => {
    const versionIndex = e.target.value;
    setSelectedVersion(versionIndex === "current" ? null : previousVersions[versionIndex]);
  };

  const displayedWriting = selectedVersion || writing;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {writing ? (
          <>
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              {displayedWriting.title}
            </h1>

            <div className="mb-6">
              <span className="text-sm text-gray-500">
                Created by:{" "}
                <span className="font-medium text-gray-700">
                  {writing.createdBy?.name || "Unknown"}
                </span>
              </span>
              <span className="ml-4 text-sm text-gray-500">
                Category:{" "}
                <span className="font-medium text-gray-700">
                  {displayedWriting.categoryId || "General"}
                </span>
              </span>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Select Version:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                onChange={handleVersionChange}
              >
                <option value="current">Current Version</option>
                {previousVersions.map((version, index) => (
                  <option key={index} value={index}>
                    Version from {new Date(version.updatedAt).toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            <div
              className="prose lg:prose-xl text-gray-700"
              dangerouslySetInnerHTML={{ __html: displayedWriting.content }}
            />

            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Reviews
              </h2>

              <form onSubmit={submitReview} className="mb-8">
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your review..."
                  rows="4"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                />

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-500">Rating:</span>
                    {[...Array(5)].map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setRating(index + 1)}
                        className={`text-xl ${index < rating ? "text-yellow-500" : "text-gray-400"
                          }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 ml-5"
                  >
                    Submit Review
                  </button>
                </div>
              </form>

              <div>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border-b border-gray-200 py-4"
                    >
                      <p className="text-lg text-gray-700 mb-1">
                        {review.reviewText}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          By {review?.reviewer || "Anonymous"}
                        </span>
                        <span className="text-yellow-500">
                          {[...Array(review.rating)].map((_, idx) => (
                            <span key={idx}>★</span>
                          ))}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">Loading post...</div>
        )}
      </div>
    </div>
  );
};

export default ReadWriting;
