const Expense = require("../models/input")
const User = require("../models/user")
const bcrypt = require("bcrypt")

exports.addExpense = async (req, res) => {
  console.log(req.body)
  const { name, amount, description} = req.body;
  try {
    const newExpense = await Expense.create({ name: name, amount: amount, description: description });
    res.status(201).json(newExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the expense" });
  }
}

exports.getExpense = async (req, res) => {
    console.log(req.body)
    try {
      const expenses = await Expense.find().sort({ date: -1 });
      res.status(200).json(expenses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching expenses" });
    }
  }

exports.deleteExpense = async (req, res) => {
    console.log(req.params.id)
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id)
        if (!expense) return res.status(404).json({success: false, message: "Expense not found"})
        res.status(201).json({success: true, message: "Expense deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Server error"})
    }
}

exports.createUser = async (req, res) => {
  console.log(req.body)
  const { fullname, password, email } = req.body;
  try {
    const isNewUser = await User.findOne({ email: email })
    if (!isNewUser){
      return res.status(400).json({success:false, message: "User already exists!" });
    }else{
    const newUser = await User.create({ fullname: fullname, password: password, email: email });
    console.log(newUser)
    res.status(201).json(newUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the user" });
  }
}

exports.deleteUser = async (req, res) => {
    console.log(req.params.id)
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).json({success: false, message: "User not found"})
        res.status(201).json({success: true, message: "User deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Server error"})
    }
}

exports.userSignIn = async (req, res) => { 
  console.log(req.body)
  const { password, email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({success:false, message: "User not found, with the given email!" });
  }
  const isMatch = await bcrypt.compare(password, user.password); 
  if (!isMatch) {
    return res.status(400).json({success:false, message: "Email/passwords does not match!" });
  }
  res.status(200).json({success:true, message: "User logged in successfully!" });
}