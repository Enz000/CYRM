const express = require("express");
const { getMe, login } = require("../controllers/userController");

const router = express.Router();

router.post("/login", login);

router.get("/me", getMe);

module.exports = router;
