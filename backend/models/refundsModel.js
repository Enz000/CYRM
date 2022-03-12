const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const refundSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
