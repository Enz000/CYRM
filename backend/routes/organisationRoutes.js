const express = require("express");
const {
  login,
  update,
  getAll,
  create,
  createUser,
  findById,
} = require("../controllers/organisationController");
const router = express.Router();
router.get("/:id", findById);
router.post("/register", create);
router.post("/login", login);
router.post("/:id/createuser", createUser);
router.get("/", getAll);
router.put("/:id", update);
module.exports = router;
