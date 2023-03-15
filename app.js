const express = require("express")
require("dotenv").config()
require("./models/db")
const userRouter = require("./routes/user")
const inputRouter = require("./routes/input")
const imageRouter = require("./routes/image")
const bodyParser = require("body-parser")
var fs = require('fs');
const Image = require("./models/image");
const multer = require("multer");

const port = 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




app.use(express.json())
app.use("/user", userRouter)
app.use("/image", imageRouter)
app.use("/input", inputRouter)


app.listen(port, () => {
    console.log("Server listening on port " + port )
})
