const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Organisation = require("../models/organisationModel");
const User = require("../models/userModel");

// @route POST /api/user/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const organisation = await Organisation.find(
      {
        _id: { $in: user.organisation },
      },
      "name"
    );
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      organisation: organisation[0].name,
      refunds: user.refunds,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@route GET /api/user/me
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// JWT TOKEN

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "4d",
//   });
// };
module.exports = {
  login,
  getMe,
};
