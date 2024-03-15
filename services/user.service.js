const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (userData) => {
  const { username, email, password } = userData;
  const existingUser = await User.findOne({ email });

  //Check if email is already registered

  if (existingUser) {
    throw new Error("User Already Exist");
  }

  //Hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Register the user
  const user = User.create({ username, email, password: hashedPassword });

  //Return user
  return user;
};

const login = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ email });

  // Check is email registered
  if (!user) {
    throw new Error("User is not found");
  }

  //Check for passsword match
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  return { token, user };
};
module.exports = { register, login };
