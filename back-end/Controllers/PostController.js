const Post = require("../Models/Post")
const multer = require("multer")

exports.index = async (req, res) => {
    const posts = await Post.find({})
    res.status(201).json(posts)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename:  (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

exports.upload = multer({
    storage:storage
})

exports.store = async (req, res) => {
    if(! req.body.title){
        res.status(400)
        throw new Error("the Field title is required")
    }

    const post = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image:req.file.filename,
        user_id: req.body.user_id,
    }

    const created_post = await Post.create(post)
    res.status(200).json(created_post)
}

exports.show = async (req, res) => {
    const id = req.params.id

    const post = await Post.find({_id:id})
    res.status(201).json(post)

}

exports.update = async (req, res) => {
    const post = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
    }

    console.log(post);

    const updated_post = await Post.findOneAndUpdate({_id:req.params.id}, post, { new: true })
    
    res.status(201).json(updated_post)
}

exports.destroy = async (req, res) => {
    
    const deleted_post = await Post.findOneAndDelete({_id:req.params.id})
    res.status(200).json({"msg": "Post has been deleted "})
}

exports.user_posts = async (req, res) => {

    const posts = await Post.find({user_id:req.params.user_id})
    res.status(200).json(posts)
}

