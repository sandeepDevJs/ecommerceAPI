const asyncHandler = require("../api/middlewares/asyncHandler");
const crudOPs = require("../models");
const ErrorResponse = require("../utils/errorResponse");
const paginator = require("../utils/paginator")
const { verify } = require("../utils/encrypter")

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

    let reqData = { ...req.body }, data
    data = await crudOPs.createData("users", reqData)
    res.status(201).send({success:1, message:"User Created!", data})

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

module.exports.loginUser = asyncHandler(async(req, res) =>{

    let { email , password }  = req.body

    let userData = await crudOPs.getData("users", 0, { email:email })

    console.log(userData)

    let result = await verify(password, userData[0].password)        
    if (result) {
        res.send({success:true, message:"You're logged In"})
    }else{
        res.status(401).send({success:false, message:"Invalid Credentials!!"})
    }

})
