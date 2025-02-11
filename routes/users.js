const express = require("express")
const router = express.Router()

router.get("/", (req,res) => {
    res.send("user")
})

router.get("/new", (req,res) => {
    res.send("new user")
})

router.use(logger)

router.route("/:id").get((req,res) => {
    console.log(req.user)
    res.send(`Get user with ID ${req.params.id}`)
}).put((req,res) => {
    res.send(`Update user with ID ${req.params.id}`)
}).delete((req,res) => {
    res.send(`Delete user with ID ${req.params.id}`)
})

const users =[{name:"venky"},{age:21}] 
router.param("id",(req,res,next, id) => {
    req.user = users[id]
    next()
})

function logger(req,res,next){
    console.log(req.originalUrl)
    next()
}

module.exports = router