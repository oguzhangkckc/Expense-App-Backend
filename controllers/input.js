const Expense = require("../models/input");
const mongoose = require("mongoose");

///////////////////////// ADD EXPENSE ///////////////////////////

exports.addExpense = async (req, res) => {
  console.log(req.body);
  const { name, amount, description } = req.body;
  if (!name || !amount || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields" });
  }
  if(amount < 0) {
    return res 
      .status(400)
      .json({ success: false, message: "Please enter a positive amount" })
  }

  try {
    const newExpense = await Expense.create({
      email: req.params.email,
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

///////////////////////// GET EXPENSE ///////////////////////////

exports.getExpense = async (req, res) => {
  try {
    const expenses = await Expense.find({ email: req.params.email });
    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching expenses", error: error.message });
  }
};
///////////////////////// DELETE EXPENSE ///////////////////////////

exports.deleteExpense = async (req, res) => {
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

///////////////////////// UPDATE EXPENSE ///////////////////////////

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Expense id not found!" });
  }

  const expense = await Expense.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!expense) {
    return res.status(404).json({ msg: "Expense not found!" });
  }
  res.status(200).json({ msg: "Expense updated successfully!" });
};
