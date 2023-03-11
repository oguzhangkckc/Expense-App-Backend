const express = require("express")
const { login, register, getProfile, resetPassword} = require("../controllers/user")
const userRouter = express.Router()


userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/user/:id", getProfile)
userRouter.post("/reset-password", resetPassword)

module.exports = userRouter