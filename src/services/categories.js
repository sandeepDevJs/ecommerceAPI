const asyncHandler = require("../api/middlewares/asyncHandler")
const CategoriesModel = require("../models/category.schema")
const paginator = require("../utils/paginator")

module.exports.getCategories = asyncHandler(async (req, res, next) => {
 
    let { pagination, data } = await paginator("products", req.query, "subcategories")
    res.status(200).send({success:true, pagination, data})    
})

module.exports.createCategory = asyncHandler( async (req, res, next) => {

    let data = await new CategoriesModel(req.body).save()
    res.status(201).send({success:true, data:data})    

})

module.exports.deleteCategory = asyncHandler( async (req, res) => {
    let data = await CategoriesModel.findById(req.params.id)
    if (!data) {
        return res.status(400).send({success:false, message:"deletion failed!"})
    }

    data.remove();
    return res.send({success:true, data:data})
} )