const express = require("express");
const { getMe, login, createRefund } = require("../controllers/userController");

const router = express.Router();
router.post("/login", login);
router.post("/:id/createrefund", createRefund);
router.get("/me", getMe);

module.exports = router;
