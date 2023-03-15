const express = require("express")
const { login, register, resetPassword, addImage} = require("../controllers/user")
const userRouter = express.Router()
const { requireAuth } = require("../middleware/requireAuth");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });



userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.post("/reset-password", resetPassword)

// userRouter.use(requireAuth);

// userRouter.post("/add-image/:email", upload.single("image"), addImage);

module.exports = userRouter