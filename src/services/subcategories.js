
/**
 * 
 * This File Holds all services related to Subcategory
 * 
 * these functions are imported into Subcategory routes
 * =====================================================
 * PATH: api/subcategories/
 * 
 */


const asyncHandler = require("../api/middlewares/asyncHandler")
const crudOPs = require("../models")
const paginator = require("../utils/paginator")

module.exports.getSubcategories = asyncHandler(async (req, res, next) => {

    let { pagination, data } = await paginator("subcategories", req.query)
    res.status(200).send({success:true, pagination, data})    
})

module.exports.createSubcategory = asyncHandler( async (req, res) => {

    let category_id = req.body.category_id, reqData = { ...req.body}, data;
    if(!category_id) return res.status(400).send({success:false, message:"No Category Id Provided."})

    data = crudOPs.createData("subcategories", reqData)
    res.status(201).send({success:true, data})    

})

module.exports.deleteSubCategory = asyncHandler( async (req, res) => {
    let id = req.params.id
    let data = await crudOPs.deleteData("subcategories", id)
    return res.send({success:true, data})
} )

module.exports.getSubCategoryById = asyncHandler( async (req, res) => {

    let id = req.params.id, data;
    data = await crudOPs.getData("subcategories", id)
    return res.send({success:true, data})
})

module.exports.updateSubCategory = asyncHandler( async (req, res) => {

    let id = req.params.id, reqData = { ...req.body }, data;
    if (reqData.category_id) {
        await crudOPs.getData("categories",reqData.category_id)
    }
    
    data = await crudOPs.updateData("subcategories", id, reqData)
    return res.send({success: true, data_modified:data})
})