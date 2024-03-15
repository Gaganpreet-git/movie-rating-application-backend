const movieService = require("../services/movie.service");

const addNewMovie = async (req, res) => {
  try {
    //Try to add Movie
    const movie = await movieService.addNewMovie(req.body);

    // Movie added successfully
    res.status(201).json({
      message: "Movie added Successfully",
      movie,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    //Try to update movie
    const updatedMovie = await movieService.updateMovie(movieId, req.body);

    if (!updatedMovie) {
      throw new Error("Movies does not exist");
    }

    //Movie updated successfully
    res.status(200).json({
      message: "Movie updated Successfully",
      updatedMovie,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    //Try to delete movie
    const success = await movieService.deleteMovie(movieId);

    if (!success) {
      return res.status(404).json({ message: "Movie not found" });
    }

    //Movie deleted successfully
    res.status(204).json({
      message: "Movie deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getMovieDetails = async (req, res) => {
  try {
    const movieId = req.params.id;

    const movie = await movieService.getMovieDetails(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllMovies = async (req, res) => {
  try {
    // console.log(req.query);
    // const { genre, director, releaseYear } = req.query;
    const allMovies = await movieService.getAllMovies(req.query);

    if (!allMovies.length) {
      return res.status(404).json({ message: "No movie found." });
    }

    res.status(200).json(allMovies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addNewMovie,
  updateMovie,
  deleteMovie,
  getMovieDetails,
  getAllMovies,
};
