const express = require("express")
const { login, register, resetPassword} = require("../controllers/user")
const userRouter = express.Router()


userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.post("/reset-password", resetPassword)

module.exports = userRouter