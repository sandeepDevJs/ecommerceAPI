const ProductModel = require("../models/products.schema")
const asyncHandler = require("../api/middlewares/asyncHandler")

module.exports.getProducts = asyncHandler(async (req, res) =>{
    let data;
    let query;
    let reqQuery = { ...req.query }
    
    //fields we don't need while filtering
    let removeFields = ["select", "sort", "page", "limit"]
    removeFields.forEach( (param) => delete reqQuery[param] )

    query = ProductModel.find(reqQuery).populate({path: "category subcategory", select: "category subcategory -_id"})
    
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
    let limit = parseInt(req.query.limit, 10) || 10
    let startIndex = (page - 1) * limit
    let endIndex = page*limit
    let total = await ProductModel.countDocuments()

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

    data = await query.select("-__v")
    res.status(200).send({success:true, pagination, data:data})
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
    res.status(201).send({message:"Product Created"})

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

