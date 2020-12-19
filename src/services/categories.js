const asyncHandler = require("../api/middlewares/asyncHandler")
const CategoriesModel = require("../models/category.schema")

module.exports.getCategories = asyncHandler(async (req, res, next) => {
 
    let query
    let data
    let reqQuery = { ...req.query }

    //fiels we dont need in filtering
    let removeFields = ["select", "sort", "page", "limit"]
    removeFields.forEach( (param) => delete reqQuery[param] )

    let pagination = {}
    query = CategoriesModel.find(reqQuery).populate({path: "subcategories", select:"-__v -_id"})

    //pagination
    let page = parseInt(req.query.page, 10) || 1
    let limit = parseInt(req.query.limit, 10) || 2
    let startIndex = (page - 1) * limit
    let endIndex = page * limit
    let total = CategoriesModel.countDocuments() 

    if ( endIndex < total ) {
        
        pagination.next = {
            page: page+1,
            limit
        }

    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page-1,
            limit
        }
    }

    query = query.skip(startIndex).limit(limit)

    //if any sort operation
    if (req.query.sort) {
        let sortBy = req.query.sort.split(",").join(" ")
        query = query.sort(sortBy)
    }

    data = await query.select("-__v")
    res.status(200).send({success:true, pagination, data:data})    
})

module.exports.createCategory = asyncHandler( async (req, res, next) => {

    let data = await new CategoriesModel(req.body).save()
    res.status(201).send({success:true, data:data})    

})

module.exports.deleteCategory = asyncHandler( async (req, res) => {
    let data = await CategoriesModel.findById(req.params.id)
    if (!data) {
        return res.status(400).send({success:false, message:"deletion failed!"})
    }

    data.remove();
    return res.send({success:true, data:data})
} )