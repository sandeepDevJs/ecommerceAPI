const ProductModel = require("../models/products.schema")
const asyncHandler = require("../api/middlewares/asyncHandler")

module.exports.getProducts = asyncHandler(async (req, res) =>{
    let data;
    if(req.query){
        data = await ProductModel.find(req.query)
    }else{
        data = await ProductModel.find()
    }
    res.status(200).send({success:true, data:data})
})

module.exports.getProductById =  asyncHandler(async (req, res) =>{
    let data = await ProductModel.findById(req.params.id)
    if (!data) {
        res.status(200).send({success:true, data:"No data found"})
        return false
    }
    res.status(200).send({success:true, data:data})
})

module.exports.createProduct = asyncHandler(async (req, res) =>{

    await new ProductModel(req.body).save()
    res.send({message:"create users"})

})

module.exports.deleteProduct = asyncHandler(async (req, res) =>{
    let data = await ProductModel.findByIdAndDelete(req.params.id)
    if (!data) {
        return res.status(400).send({success:false})
    }
    return res.send({success:true, data:{}})
})

module.exports.updateProduct = asyncHandler(async (req, res) =>{
    let data = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true
    });
    if (!data) {
        return res.status(400).send({success:false, message:"No data Associated To Provided ID"})
    }
    return res.send({success:true, data:data})
})

