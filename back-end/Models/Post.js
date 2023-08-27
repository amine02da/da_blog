const mongoose = require("mongoose")

const PostScheme = mongoose.Schema(
    {
        title: {
            type:String,
            required: [true, "add title"]
        },

        description: {
            type:String,
        },

        image: {
            type:String
        },
        
        category: {
            type:String,
            required: [true, "add category"]
        },

        user_id: {
            type:mongoose.Schema.Types.ObjectId,
            // required: true,
            // ref:User
        }

    },

    {
        timestamps: true
    }
)

module.exports = mongoose.model("posts", PostScheme)