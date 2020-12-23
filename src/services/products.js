const asyncHandler = require("../api/middlewares/asyncHandler")
const crudOPs = require("../models")
const paginator = require("../utils/paginator")
const upload = require("../utils/multer")("product_image")
const ErrorResponse = require("../utils/errorResponse")

module.exports.getProducts = asyncHandler(async (req, res) =>{

    let { pagination, data } = await paginator("products", req.query)
    res.status(200).send({success:true, pagination, data})    

})

module.exports.createProduct = asyncHandler(async (req, res) =>{

    let category_id = req.body.category
    let subcategory_id = req.body.subcategory
    let requestedData = { ...req.body }
    let data = undefined

    // console.log(req.body)
    // return res.end()
    // upload(req, res, (err) =>{
    //     if (err instanceof multer.MulterError) {
    //         throw new ErrorResponse(err.message, 400)
    //       } else if (err) {
    //         throw new ErrorResponse("An Unhandled Error Occured While Uploading Image!", 500)
    //       }
    // })

    //below code just checks if the provided category id & subcategory_id exists in db
    //if category_id & subcategory_id not found it will simply throw an error & will be catched by asyncHandler
    await crudOPs.getData("categories", category_id)
    await crudOPs.getData("subcategories", subcategory_id)

    data = await crudOPs.createData("products", requestedData)

    //Everythinng is fine. product is created.
    res.status(201).send({success:1, message:"Product Created", data: data})

    
})

module.exports.deleteProduct = asyncHandler(async (req, res) =>{
    let product_id = req.params.id 
    await crudOPs.deleteData("products", product_id)
    return res.send({success:true, message:"Data Deleted!!"})
})

module.exports.updateProduct = asyncHandler(async (req, res) =>{
    
    let data, product_id = req.params.id, requestedData = { ...req.body }

    if (requestedData.category) {
        let category = await crudOPs.getData("categories", requestedData.category)
        requestedData.category = category.category
    }

    if (requestedData.subcategory) {
        let subcategory = await crudOPs.getData("subcategories", requestedData.subcategory)     
        requestedData.subcategory = subcategory.subcategory   
    }

    data = await crudOPs.updateData("products", product_id, requestedData);
    return res.send({success:true, data_modified:data})
})

module.exports.getProductById = asyncHandler( async (req, res) =>{

    let data, product_id = req.params.id
    data = await crudOPs.getData("products", product_id)
    res.status(200).send({success:true, data})

})

