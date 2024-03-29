const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Register a new user
router.post("/register", userController.register);

// Login existing user
router.post("/login", userController.login);

module.exports = router;
