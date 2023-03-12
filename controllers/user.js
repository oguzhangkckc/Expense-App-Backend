const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

///////////////////////// LOGIN /////////////////////////////

exports.login = async (req, res) => {
  console.log("loginUser");
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    console.log("error.message :" + error.message);
    res.status(400).json({ error: error.message });
  }
};

///////////////////////// REGISTER /////////////////////////////

exports.register = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const user = await User.register(fullname, email, password);

    const token = createToken(user._id);
    res.status(201).json({ email, token });
  } catch (error) {
    console.log("error.message :" + error.message);
    res.status(400).json({ error: error.message });
  }
};
