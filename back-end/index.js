const express = require("express")
const dotenv = require("dotenv").config()
const port = process.env.port || 4000
const { connexion } = require("./config/db")
const PostRouter = require("./Routes/PostRoute")
const categoryRoute = require("./Routes/Category")
const cors = require("cors")
const UserRoute = require("./Routes/UserRoute")

const app = express()

// DataBase
connexion()

// actepting data
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(cors())

// Posts
app.use("/posts", PostRouter)
// Categories
app.use("/categories", categoryRoute)

// Users
app.use("/user", UserRoute)

// server
app.listen(port, ()=>{
    console.log("server is running PORT = " + port);
})
