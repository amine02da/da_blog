const express = require("express")
const { register, login, upload } = require("../Controllers/UserController")

const UserRoute = express.Router()

UserRoute.post("/register",upload.single('image'), register)
UserRoute.post("/login", login)

module.exports = UserRoute