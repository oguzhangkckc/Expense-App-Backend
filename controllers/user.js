const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
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
  const { fullname, email, password, confirmPassword } = req.body;
  console.log(fullname, email, password, confirmPassword);
  try {
    const user = await User.register(
      fullname,
      email,
      password,
      confirmPassword
    );

    const token = createToken(user._id);
    res.status(201).json({ email, token });
  } catch (error) {
    console.log("error.message :" + error.message);
    res.status(400).json({ error: error.message });
  }
};

///////////////////////// RESET PASSWORD /////////////////////////////

exports.resetPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  console.log(email, password);
  try {
    const user = await User.resetPassword(email, password, confirmPassword);

    const token = createToken(user._id);

    res.status(201).json({ email, token });
  } catch (error) {
    console.log("error.message :" + error.message);
    res.status(400).json({ error: error.message });
  }
};

///////////////////////// ADD IMAGE ////////////////////////////////////

exports.addImage = async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log(user);

  // Assuming that you have a middleware that handles file uploads and
  // stores the uploaded file in req.file
  const image = req.file.path;

  // Associate the image with the user and save it
  user.image = image;
  try {
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while saving image" });
  }
};
