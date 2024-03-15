const reviewService = require("../services/review.service");

const addReview = async (req, res) => {
  try {
    console.log("movieId", req.params.id);
    const review = await reviewService.addReview(
      req.user.id,
      req.params.id,
      req.body.rating,
      req.body.text
    );

    res.status(201).json({ message: "Review added successfully", review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.id;
    const reviewId = req.params.reviewId;
    const { rating, text } = req.body;

    console.log("movieId", movieId);
    const updatedReview = await reviewService.updateReview(
      reviewId,
      movieId,
      userId,
      rating,
      text
    );

    // if (!updatedReview) {
    //   return res.status(404).json({ message: "Review not found" });
    // }

    res
      .status(200)
      .json({ message: "Review updated successfully", updatedReview });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.id;
    const reviewId = req.params.reviewId;
    console.log("movieId", movieId);

    const success = await reviewService.deleteReview(reviewId, movieId, userId);

    if (!success) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(204).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllReviews = async (req, res) => {
  try {
    const movieId = req.params.id;
    console.log("movieId", movieId);
    const allReviews = await reviewService.getAllReviews(movieId);

    if (!allReviews.length) {
      return res.status(404).json({ message: "No review found." });
    }

    res.status(200).json(allReviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAverageRating = async (req, res) => {
  try {
    const movieId = req.params.id;
    console.log("movieId", movieId);

    const averageRating = await reviewService.getAverageRating(movieId);

    res.status(200).json({ movieId, averageRating });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getAverageRating,
};
