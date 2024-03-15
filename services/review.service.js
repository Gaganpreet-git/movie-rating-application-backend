const Review = require("../models/Review.model");

const addReview = async (userId, movieId, rating, text) => {
  const review = await Review.create({ userId, movieId, rating, text });

  return review;
};

const updateReview = async (reviewId, movieId, userId, rating, text) => {
  const review = await Review.findByIdAndUpdate(
    { _id: reviewId, movieId, userId },
    { $set: { rating, text } },
    { new: true }
  );

  return review;
};

const deleteReview = async (reviewId, movieId, userId) => {
  const review = await Review.findByIdAndDelete({
    _id: reviewId,
    movieId,
    userId,
  });

  return review;
};

const getAllReviews = async (movieId) => {
  const allReviews = await Review.find({
    movieId,
  });

  return allReviews;
};

const getAverageRating = async (movieId) => {
  const ratings = await Review.find({ movieId });
  const totalRatings = ratings.length;
  let ratingSum = 0;

  ratings.forEach((rating) => {
    ratingSum += parseFloat(rating.rating);
  });
  const average = ratingSum / totalRatings;

  return average;
};

module.exports = {
  addReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getAverageRating,
};
