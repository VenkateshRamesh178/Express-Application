const express = require('express')
const app = express()

app.use(express.static("assets"))
app.use(express.urlencoded({extended : true}))

app.set("view engine", "ejs")

app.get('/',(req,res) => {
    res.render("index", {text: "World"})
})

const userRouter = require("./routes/users")
app.use("/users", userRouter)

app.listen(3000)