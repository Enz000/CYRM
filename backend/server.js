require("dotenv").config();
require("colors");
const express = require("express");
const { responseError, error404 } = require("./middlewares/errorMiddleware");
const connectDb = require("./config/db");
const app = express();
const port = process.env.PORT;
connectDb();
const refundRoutes = require("./routes/refundRoutes");
const userRoutes = require("./routes/userRoutes");
// Middleware for render body accessible
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Routes
app.use("/api/refund", refundRoutes);
app.use("/api/user", userRoutes);
// Error
app.use(responseError);
app.use(error404);
//Server
app.listen(port, () => {
  console.log(`run http://localhost:${port}`.bgYellow.black);
});
