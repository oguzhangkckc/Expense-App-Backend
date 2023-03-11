const express = require("express")
require("dotenv").config()
require("./models/db")
const inputRouter = require("./routes/input")
const userRouter = require("./routes/user")


const port = 3000
const app = express()

app.use(express.json())
app.use("/user", userRouter)
app.use("/input", inputRouter)



app.listen(port, () => {
    console.log("Server listening on port " + port )
})
