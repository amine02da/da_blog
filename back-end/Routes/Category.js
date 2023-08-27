const express = require("express")
const { index, store, show, update, destroy } = require("../Controllers/CategoryController")

const categoryRoute = express.Router()

categoryRoute.get("/", index)
categoryRoute.post("/", store)
// categoryRoute.get("/:id", show)
categoryRoute.put("/:id", update)
categoryRoute.delete("/:id", destroy)

module.exports = categoryRoute