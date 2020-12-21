const asyncHandler = require("../api/middlewares/asyncHandler")
const crudOPs = require("../models")
const paginator = require("../utils/paginator")

module.exports.getCategories = asyncHandler(async (req, res, next) => {
 
    let { pagination, data } = await paginator("categories", req.query, "subcategories")
    res.status(200).send({success:true, pagination, data})    
})

module.exports.createCategory = asyncHandler( async (req, res, next) => {

    let data = await crudOPs.createData("categories", req.body)
    res.status(201).send({success:true, data:data})    

})

module.exports.deleteCategory = asyncHandler( async (req, res) => {
    let id = req.params.id
    let data = await crudOPs.deleteData("categories", id)
    return res.send({success:true, data})
} )

module.exports.getCategoryById = asyncHandler( async (req, res) => {

    let id = req.params.id, data;
    data = await crudOPs.getData("categories", id)
    return res.send({success:true, data})
})

module.exports.updateCategory = asyncHandler( async (req, res) => {

    let id = req.params.id, reqData = { ...req.body }, data;
    data = await crudOPs.updateData("categories", id, reqData)
    return res.send({success: true, data_modified:data})
})