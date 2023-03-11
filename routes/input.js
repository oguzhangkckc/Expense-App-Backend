const express = require("express")
const { addExpense, getExpense, deleteExpense, updateExpense} = require("../controllers/input")
const inputRouter = express.Router()


inputRouter.post("/add-expense", addExpense)
inputRouter.get("/get-expense", getExpense)
inputRouter.delete("/delete/:id", deleteExpense)
inputRouter.put("/update/:id", updateExpense)


module.exports = inputRouter