const express = require("express")
const { addExpense, getExpense, deleteExpense, updateExpense} = require("../controllers/input")
const { login, register, getProfile, resetPassword} = require("../controllers/user")
const router = express.Router()


router.post("/add-expense", addExpense)
router.get("/get-expense", getExpense)
router.delete("/delete/:id", deleteExpense)
router.put("/update/:id", updateExpense)

router.post("/register", register)
router.post("/login", login)
router.get("/user/:id", getProfile)
router.post("/reset-password", resetPassword)

module.exports = router