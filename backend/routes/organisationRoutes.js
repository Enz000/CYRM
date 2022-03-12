const express = require("express");
const organisationController = require("../controllers/organisationController");

const router = express.Router();

router.get("/", organisationController.getAll);
router.get("/:id", organisationController.findById);
router.post("/register", organisationController.create);
router.post("/login", organisationController.login);
router.put("/:id", organisationController.update);

module.exports = router;
