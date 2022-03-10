const error404 = (req, res, next) => {
  console.log("404 ERROR ".red.underline);
  res.status(404).send("Route not found");
};
const responseError = (error, req, res, next) => {
  console.log("responseEroor Middleware ".green.bold);
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};

module.exports = {
  responseError,
  error404,
};
