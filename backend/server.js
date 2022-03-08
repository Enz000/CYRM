require("dotenv").config();
const express = require("express");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const app = express();
const port = process.env.PORT;

const refundRoutes = require("./routes/refundRoutes");
// Middleware for render body accessible
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Routes
app.use("/api", refundRoutes);
// Error
app.use(errorMiddleware);

//Server
app.listen(port, () => {
  console.log(`run http://localhost:${port}`);
});
