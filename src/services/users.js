const userModel = require("../models/users.schema")
const asyncHandler = require("../api/middlewares/asyncHandler");
const { query } = require("express");

module.exports.getUsers = asyncHandler(async (req, res) =>{
    let data;
    let query;
    let reqQuery = { ...req.query }
    
    //fields we don't need while filtering
    let removeFields = ["select", "sort", "limit", "page"]
    removeFields.forEach( (param) => delete reqQuery[param] )

    query = userModel.find(reqQuery)

    //if any select opertaions
    if (req.query.select) {
        let fields = req.query.select.split(",").join(" ")
        query.select(fields)
    }

    //if any sort operation
    if (req.query.sort) {
        let sortBy = req.query.sort.split(",").join(" ")
        query = query.sort(sortBy)
    }

    //pagination
    let page = parseInt(req.query.page, 10) || 1
    let limit = parseInt(req.query.limit, 10) || 2
    let startIndex = (page - 1) * limit
    let endIndex = page*limit
    let total = await userModel.countDocuments()

    //pagination result
    let pagination = {}

    if (endIndex < total) {
        pagination.next = {
            page: page+1,
            limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page:page - 1,
            limit
        }
    }

    query = query.skip(startIndex).limit(limit)

    data = await query
    res.status(200).send({success:true, pagination, data:data})
})

module.exports.getUserById =  asyncHandler(async (req, res) =>{
    let data = await userModel.findById(req.params.id)
    if (!data) {
        res.status(200).send({success:true, data:"No data found"})
        return false
    }
    res.status(200).send({success:true, data:data})
})

module.exports.createUser = asyncHandler(async (req, res) =>{

    await new userModel(req.body).save()
    res.send({message:"create users"})

})

module.exports.deleteUser = asyncHandler(async (req, res) =>{
    let data = await userModel.findByIdAndDelete(req.params.id)
    if (!data) {
        return res.status(400).send({success:false})
    }
    return res.send({success:true, data:{}})
})

module.exports.updateUser = asyncHandler(async (req, res) =>{
    let data = await userModel.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true
    });
    if (!data) {
        return res.status(400).send({success:false, message:"No data Associated To Provided ID"})
    }
    return res.send({success:true, data:data})
})

module.exports.loginUser = asyncHandler(async(req, res) =>{

    res.end();

})
