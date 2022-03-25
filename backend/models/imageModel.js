const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nom est obligatoire"],
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Image", imageSchema);