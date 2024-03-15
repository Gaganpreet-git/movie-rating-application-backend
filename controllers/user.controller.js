const userService = require("../services/user.service");

const register = async (req, res) => {
  // Try to register
  try {
    const user = await userService.register(req.body);

    //Registration is successful
    res.status(201).json({
      message: "User registered successfully",
      user: user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    //Try to login
    const { user, token } = await userService.login(req.body);

    //Login Success
    res.status(200).json({
      message: "Login Successful",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };
