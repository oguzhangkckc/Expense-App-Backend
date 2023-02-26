const express = require("express")
require("dotenv").config()
require("./models/db")
const inputRouter = require("./routes/input")


const port = 3000
const app = express()

app.use(express.json())
app.use(inputRouter)

// app.use((req, res, next) => {
//     req.on("data", (chunk) => {
//         const data = JSON.parse(chunk)
//         req.body = data
//         })
//         next()
//     })


app.listen(port, () => {
    console.log("Server listening on port " + port )
})
