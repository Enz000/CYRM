const Organisation = require("../models/organisationModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const organisationController = {
  getAll: asyncHandler(async (req, res) => {
    const organisations = await Organisation.find();
    res.status(200).json(organisations);
  }),
  findById: asyncHandler(async (req, res) => {
    const { _id, name, email, users } = await Organisation.findById(
      req.params.id
    );
    res.status(200).json({
      _id,
      name,
      email,
      users,
    });
  }),
  create: asyncHandler(async (req, res) => {
    let hashedPassword;
    const { name, email, password, users } = req.body;
    const orgaExist = await Organisation.findOne({ email });
    if (orgaExist) {
      res.status(401);
      throw new Error("Une organisatione existe déjà avec cette adresse mail");
    }
    if (password.length >= 6) {
      hashedPassword = await bcrypt.hash(password, 10);
    } else {
      res.status(400);
      throw new Error("Votre mot de passe doit contenir plus de 6 caractères");
    }
    const createOrganisation = await Organisation.create({
      name,
      email,
      password: password ? hashedPassword : null,
      users,
    });
    if (createOrganisation) {
      res.status(201).json(createOrganisation);
    } else {
      res.status(400);
      throw new Error("Invalide user data");
    }
  }),
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const organisation = await Organisation.findOne({ email });
    if (
      organisation &&
      (await bcrypt.compare(password, organisation.password))
    ) {
      res.json({
        _id: organisation.id,
        name: organisation.name,
        email: organisation.email,
      });
    } else {
      res.status(400);
      throw new Error("Identifiant de connexion invalide");
    }
  }),
  update: asyncHandler(async (req, res) => {
    try {
      const updateOrganisation = await Organisation.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(200).json({ message: "Organisation mise à jour" });
    } catch (error) {
      res.status(500).json({
        error: "L'organisation n'as pas pu être mise à jour",
      });
    }
  }),
};

module.exports = organisationController;
