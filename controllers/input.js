const Expense = require("../models/input");

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