const Expense = require("../models/input");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

exports.addExpense = async (req, res) => {
  console.log(req.body);
  const { name, amount, description } = req.body;
  if (!name || !amount || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields" });
  }
  try {
    const newExpense = await Expense.create({
      name: name,
      amount: amount,
      description: description,
    });
    res.status(201).json(newExpense);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the expense" });
  }
};

exports.getExpense = async (req, res) => {
  console.log(req.body);
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching expenses" });
  }
};

exports.deleteExpense = async (req, res) => {
  console.log(req.params.id);
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense)
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    res.status(201).json({ success: true, message: "Expense deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.createUser = async (req, res) => {
  console.log(req.body);
  const { fullname, password, email } = req.body;

  if (!fullname || !password || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Password must be at least 6 characters",
      });
  }

  const exist = await User.findOne({ email: email });
  if (exist) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists!" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    fullname: fullname,
    password: hashedPassword,
    email: email,
  });

  res.status(201).json(newUser);
};

exports.deleteUser = async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(201).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({
          success: false,
          message: "User not found, with the given email!",
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Email/passwords does not match!" });
    }

    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while logging in the user" });
  }
};
