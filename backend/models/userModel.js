const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      min: 1,
      max: 50,
    },
    email: {
      type: String,
      required: [true, "Veuillez renseigner votre adresse mail"],
      minLenght: [5, "Votre adresse mail doit faire au moins 5 caractères"],
      lowercase: true,
      unique: [true, "Un utilisateur existe déjà avec cette adresse mail"],
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Format de votre adresse mail incorect",
      ],
    },
    password: {
      type: String,
      required: [true, "Veuillez renseigner un mot de passe"],
      minLenght: [6, "Votre mot de passe doit faire au moins 6 caractères"],
    },
    organisation: {
      type: Schema.Types.ObjectId,
      ref: "Organisation",
    },
    refunds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Refund",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
