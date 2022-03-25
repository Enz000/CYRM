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
      required: [true, "Ajoutez un titre"],
    },
    price: {
      type: Number,
      required: [true, "Ajoutez un prix"],
    },
    tva: {
      type: Number,
      required: [true, "Tva manquante"],
    },
    buyingDate: {
      type: String,
      required: [true, "Ajoutez une date d'achat"],
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Refund", refundSchema);
