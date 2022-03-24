const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Organisation = require("../models/organisationModel");
const User = require("../models/userModel");

const getAll = asyncHandler(async (req, res) => {
  const organisations = await Organisation.find();
  res.status(200).json(organisations);
});

const create = asyncHandler(async (req, res) => {
  let hashedPassword;
  const { name, email, password } = req.body;
  const orgaExist = await Organisation.findOne({ email });
  if (orgaExist) {
    res.status(401);
    throw new Error("Une organisatione existe déjà avec cette adresse mail");
  }
  if (!password) {
    throw new Error("Veuillez renseigner un mot de passe");
  } else if (password.length < 6) {
    throw new Error("Votre mot de passe doit faire plus de 6 caractères");
  } else {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  const createOrganisation = await Organisation.create({
    name,
    email,
    password: password ? hashedPassword : null,
  });
  if (createOrganisation) {
    res.status(201).json({
      id: createOrganisation._id,
      name: createOrganisation.name,
      email: createOrganisation.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalide user data");
  }
});

const findById = asyncHandler(async (req, res) => {
  const organisation = await Organisation.findById(req.params.id);
  if (organisation) {
    res.status(200).json({
      id: organisation._id,
      name: organisation.name,
      email: organisation.email,
      users: organisation.users,
    });
  } else {
    res.status(500);
    throw new Error("Organisation non trouvée");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const organisation = await Organisation.findOne({ email });
  if (organisation && (await bcrypt.compare(password, organisation.password))) {
    const user = await User.find(
      {
        _id: { $in: organisation.users },
      },
      "name email"
    );
    res.json({
      data: [
        {
          _id: organisation.id,
          name: organisation.name,
          email: organisation.email,
          users: user,
          updatedAt: organisation.updatedAt,
          createdAt: organisation.createdAt,
        },
      ],
    });
  } else {
    res.status(400);
    throw new Error("Identifiant de connexion invalide");
  }
});

const update = asyncHandler(async (req, res) => {
  let hashedPassword;
  const org = await Organisation.findById(req.params.id);
  const { name, email, password } = req.body;
  /*
    Check if the body is empty
    */
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error("Aucun champs à été mis à jour");
  } else if (password === "") {
    res.status(400);
    throw new Error("Veuillez renseigner un mot de passe");
  } else if (password) {
    // Check if the password field is empty or not
    if (password.length < 6) {
      res.status(400);
      throw new Error("Votre mot de passe doit faire au moins 6 caractères");
    } else {
      hashedPassword = await bcrypt.hash(password, 10);
    }
  }
  await Organisation.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      /*
        ? if there's no password in the body, put the hold password currently storage in the current organisation
        */
      password: password ? hashedPassword : org.password,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ message: "Organisation mise à jour avec succes" });
});

const createUser = asyncHandler(async (req, res) => {
  let hashedPassword;
  const { name, email, password } = req.body;
  const organisation = await Organisation.findById(req.params.id);
  if (organisation) {
    hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: password ? hashedPassword : null,
      organisation: req.params.id,
    });
    await Organisation.findByIdAndUpdate(
      req.params.id,
      { $push: { users: user._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(201).json({
      message: `L'utilisateur ${user.name} à bien été créé`,
    });
  } else {
    res.status(500);
    throw new Error("L'utilisateur n'a pas pu être créé");
  }
});

module.exports = {
  getAll,
  create,
  findById,
  update,
  login,
  createUser,
};
