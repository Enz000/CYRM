const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { verifyToken } = require("../utils/jwt");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];
      //check the token
      const decoded = verifyToken(token);
      //Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(403);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(403);
    throw new Error("Invalid Token");
  }
});

module.exports = { protect };
