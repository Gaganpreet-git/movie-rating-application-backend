require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

const userRoutes = require("./routes/user.routes");
const movieRoutes = require("./routes/movie.routes");

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Start express server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
