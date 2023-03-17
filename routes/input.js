const express = require("express");
const {
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require("../controllers/input");
const inputRouter = express.Router();
const { requireAuth } = require("../middleware/requireAuth");

inputRouter.use(requireAuth);

inputRouter.post("/add-expense/:email", addExpense);
inputRouter.get("/get-expense/:email", getExpense);
inputRouter.delete("/delete/:id", deleteExpense);
inputRouter.put("/update/:id", updateExpense);

module.exports = inputRouter;
