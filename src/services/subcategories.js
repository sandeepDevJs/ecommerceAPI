const asyncHandler = require("../api/middlewares/asyncHandler")
const SubcategoriesModel = require("../models/subcategory.schema")
const CategoriesModel = require("../models/category.schema")
const paginator = require("../utils/paginator")

module.exports.getSubcategories = asyncHandler(async (req, res, next) => {

    let { pagination, data } = await paginator("subcategories", req.query)
    res.status(200).send({success:true, pagination, data})    
})

module.exports.createSubcategory = asyncHandler( async (req, res) => {

    let category_id = req.body.category_id
    if (! await CategoriesModel.findById(category_id)) {
        res.status(400).send({success:false, message:"We Need Proper Category_id."});
        return false;    
    }
    let dataToBeSaved = { ...req.body }
    console.log(dataToBeSaved)

    let data = await new SubcategoriesModel(dataToBeSaved).save()
    res.status(201).send({success:true, data:data})    

})