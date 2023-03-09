const express = require("express")
const { addExpense, getExpense, deleteExpense, updateExpense} = require("../controllers/input")
const { deleteUser, login, register} = require("../controllers/user")
const router = express.Router()


router.post("/add-expense", addExpense)
router.get("/get-expense", getExpense)
router.delete("/:id", deleteExpense)
router.put("/:id", updateExpense)

router.post("/register", register)
router.post("/login", login)
router.delete("/delete-user/:id", deleteUser)

module.exports = router