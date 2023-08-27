const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User  = require("../Models/User")
const multer = require("multer")

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
exports.register = async (req, res) => {

    const { name, email, password } = req.body
    
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please add All field !")
    }

    const checkUser = await User.findOne({email})
    if(checkUser){
        res.status(400)
        throw new Error("User already exists !")
    }

    const slat = await bcrypt.genSalt(10)
    const hashedPasswod = await bcrypt.hash(password, slat)

    const user = await User.create({
        name,
        email,
        password: hashedPasswod,
        image:req.file.filename
    })

    if(user){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            image: user.image,
            token:generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data !")
    }

}

const generateToken = (id) =>
{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"30d"})
}

exports.login = async (req, res) => {

    const {email, password} = req.body

    if( !email || !password){
        res.status(400)
        throw new Error("Please add All field !")
    }

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            image: user.image,
            token:generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid credentials !")
    }
}