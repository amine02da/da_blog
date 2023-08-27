const Category = require("../Models/Category")

exports.index = async (req, res) => {

    const categories = await Category.find({})
    res.status(201).json(categories)
}

exports.store = async (req, res) => {

    const category = {
        name: req.body.name
    }

    const created_category = await Category.create(category)
    res.status(201).json(created_category)
}

// exports.show = async (req, res) => {
    
//     const category = await Category.find({_id: req.params.id})
//     res.status(201).json(category)
// }

exports.update = async (req, res) => {
    const new_category = {
        name: req.body.name
    }

    await Category.findOneAndUpdate({_id:req.params.id}, new_category)
    res.status(200).json({"success": "Category has been updated"})
}

exports.destroy = async (req, res) => {
    await Category.findOneAndDelete({_id:req.params.id})
    res.status(200).json({"success": "Category has been deleted"})

}