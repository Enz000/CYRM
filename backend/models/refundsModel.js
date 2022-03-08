const mongoose = require("mongoose");

const refundSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title value"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price value"],
    },
    tva: {
      type: Number,
      required: [true, "Please add a TVA value"],
    },
    img: {
      type: String,
      required: [true, "Please add a proof"],
    },
    dateBuying: {
      type: Date,
      required: [true, "Please add buying date"],
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Refund", refundSchema);
