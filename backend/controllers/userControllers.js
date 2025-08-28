const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../util/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(400);
    throw new Error("User Already Exist.");
  }

  const user = await User.create({ name, email, password, pic });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Error Occured!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Invalid email or password!");
  }
});

module.exports = { registerUser, authUser };
