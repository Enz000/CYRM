const jwt = require("jsonwebtoken");

const generateAccesToken = (id) => {
  return jwt.sign({ id }, "623c8620149f77841407502c623c8620149f77841407502c", {
    expiresIn: "1000",
  });
};

console.log(generateAccesToken(2));

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
