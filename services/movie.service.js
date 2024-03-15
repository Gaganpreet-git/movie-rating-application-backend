const Movie = require("../models/Movie.model");

const addNewMovie = async (movieData) => {
  const existingMovie = await Movie.findOne({ title: movieData.title });

  // Movie already present
  if (existingMovie) {
    throw new Error("Movie already present in DB.");
  }

  // Add Movie
  const movie = await Movie.create(movieData);

  //Return Movie
  return movie;
};
const updateMovie = async (movieId, updatedMovieData) => {
  // Update movie
  const updatedMovie = await Movie.findOneAndUpdate(
    { _id: movieId },
    { $set: updatedMovieData },
    { new: true }
  );

  return updatedMovie;
};

const deleteMovie = async (movieId) => {
  // Delete Movie
  const movie = await Movie.findByIdAndDelete({ _id: movieId });
  return movie;
};

const getMovieDetails = async (movieId) => {
  const movie = await Movie.findById(movieId);

  return movie;
};
const getAllMovies = async (queries) => {
  const { genre, director, releaseYear } = queries;

  let findQuery = {};

  if (genre) {
    findQuery.genre = genre;
  }
  if (director) {
    findQuery.director = director;
  }
  if (releaseYear) {
    findQuery.releaseYear = releaseYear;
  }

  const allMovies = await Movie.find(findQuery);

  return allMovies;
};

module.exports = {
  addNewMovie,
  updateMovie,
  deleteMovie,
  getMovieDetails,
  getAllMovies,
};
