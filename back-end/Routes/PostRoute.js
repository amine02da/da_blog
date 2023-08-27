const express = require("express")
const { index, store, show, update, destroy, upload, user_posts } = require("../Controllers/PostController")


const PostRouter = express.Router()

PostRouter.get("/", index)
PostRouter.post("/", upload.single('image'), store)
PostRouter.get("/:id", show)
PostRouter.get("/user/:user_id", user_posts)
PostRouter.put("/:id", update)
PostRouter.delete("/:id", destroy)

module.exports = PostRouter

