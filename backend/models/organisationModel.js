const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organisationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, "Votre nom doit fair plus de deux caractères"],
      maxLength: [50, "Votre ne peut faire plus de 50 caractères"],
    },
    email: {
      type: String,
      required: [true, "Veuillez renseigner votre adresse mail"],
      minLength: [5, "Votre adresse mail doit faire au moins 5 caractères"],
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
      minLength: [6, "Votre mot de passe doit faire au moins 6 caractères"],
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organisation", organisationSchema);
