const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @route POST /api/user/register
const registerUser = asyncHandler(async (req, res) => {
  let hashedPassword;
  const { name, email, password, admin } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  const user = await User.create({
    name,
    email,
    password: password ? hashedPassword : null,
    admin,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      admin: user.admin,
    });
  } else {
    res.status(400);
    throw new Error("Invalide user data");
  }
  res.json({ message: "Register user" });
});

// @route POST /api/user/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@route GET /api/user/me
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// JWT TOKEN

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "4d",
  });
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
