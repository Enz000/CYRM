const mongoose = require("mongoose");

(async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Mongo db connected : ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
  }
})();
