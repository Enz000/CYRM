const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organisationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 1,
    max: 255,
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
    minLength: [6, "Votre mot de passe doit faire au moins 6 caractères"],
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Organisation", organisationSchema);
