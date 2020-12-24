const asyncHandler = require("../api/middlewares/asyncHandler");
const crudOPs = require("../models");
const paginator = require("../utils/paginator")

module.exports.getUsers = asyncHandler(async (req, res) =>{

    let { pagination, data } = await paginator("users", req.query)
    res.status(200).send({success:true, pagination, data})    
})

module.exports.getUserById =  asyncHandler(async (req, res) =>{
    let id = req.params.id, data;
    data = await crudOPs.getData("users", id)
    return res.send({success:true, data})
})

module.exports.createUser = asyncHandler(async (req, res) =>{

    let reqData = { ...req.body }, data, token
    data = await crudOPs.createData("users", reqData)
    token = generateToken(data)
    res.status(201).send({success:1, message:"User Created!", token})

})

module.exports.deleteUser = asyncHandler(async (req, res) =>{
    let id = req.params.id
    let data = await crudOPs.deleteData("users", id)
    return res.send({success:true, data})
})

module.exports.updateUser = asyncHandler(async (req, res) =>{
    let id = req.params.id, reqData = { ...req.body }, data;
    data = await crudOPs.updateData("users", id, reqData)
    return res.send({success: true, data_modified:data})
})
