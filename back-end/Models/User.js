const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
{
    name: {
        type:String
    },

    email: {
        type:String,
        required : [true, "Enter your email !"],
        unique : true
    },

    password : {
        type: String,
        required : [true, "Enter your password !"] 
    },

    image: {
        type:String
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", UserSchema)