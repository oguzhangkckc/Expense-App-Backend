const express = require("express")
const { addExpense, getExpense, deleteExpense} = require("../controllers/input")
const { createUser, deleteUser, login} = require("../controllers/input")
const router = express.Router()


router.post("/add-expense", addExpense)
router.get("/get-expense", getExpense)
router.delete("/:id", deleteExpense)

router.post("/users", createUser)
router.post("/users/login", login)
router.delete("/delete-user/:id", deleteUser)

module.exports = router