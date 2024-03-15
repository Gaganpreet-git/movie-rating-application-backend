const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");
const authenticateToken = require("../middleware/authenticateToken.middleware");
const reviewController = require("../controllers/review.controller");

// Add new movie
router.post("/", authenticateToken, movieController.addNewMovie);

// update movie
router.put("/:id", authenticateToken, movieController.updateMovie);

//Delete movie
router.delete("/:id", authenticateToken, movieController.deleteMovie);

//Get movie details
router.get("/:id", authenticateToken, movieController.getMovieDetails);

// List All movies
router.get("/", authenticateToken, movieController.getAllMovies);

// Add new review
router.post("/:id/reviews", authenticateToken, reviewController.addReview);

//update review
router.put(
  "/:id/reviews/:reviewId",
  authenticateToken,
  reviewController.updateReview
);

//delete review
router.delete(
  "/:id/reviews/:reviewId",
  authenticateToken,
  reviewController.deleteReview
);

// Get all reviews
router.get("/:id/reviews", authenticateToken, reviewController.getAllReviews);

// Get movie average rating
router.get(
  "/:id/averageRating",
  authenticateToken,
  reviewController.getAverageRating
);

module.exports = router;
