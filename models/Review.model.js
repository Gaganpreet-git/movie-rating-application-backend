const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 10 },
  text: { type: String, required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
