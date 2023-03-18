const express = require("express")
const { login, register, resetPassword, addImage} = require("../controllers/user")
const userRouter = express.Router()


userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.post("/reset-password", resetPassword)

// userRouter.use(requireAuth);

// userRouter.post("/add-image/:email", upload.single("image"), addImage);

module.exports = userRouter