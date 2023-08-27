const mongoose = require("mongoose")

const CategorySchema = mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, "add"]
        }
    }
)

module.exports = mongoose.model("categories", CategorySchema)