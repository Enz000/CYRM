const jwt = require("jsonwebtoken");

const generateAccesToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return {
      message: "Invalid Token",
    };
  }
};

module.exports = {
  generateAccesToken,
  verifyToken,
};
