const userModel = require("../models/users.schema")
const asyncHandler = require("../api/middlewares/asyncHandler")

module.exports.getUsers = asyncHandler(async (req, res) =>{
    let data;
    if(req.query){
        data = await userModel.find(req.query)
    }else{
        data = await userModel.find()
    }
    res.status(200).send({success:true, data:data})
})

module.exports.getUserById =  asyncHandler(async (req, res) =>{
    let data = await userModel.findById(req.params.id)
    if (!data) {
        res.status(200).send({success:true, data:"No data found"})
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
        return res.status(400).send({success:false})
    }
    return res.send({success:true, data:data})
})

module.exports.loginUser = asyncHandler(async(req, res) =>{

    res.end();

})