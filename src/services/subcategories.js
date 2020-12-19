const asyncHandler = require("../api/middlewares/asyncHandler")
const SubcategoriesModel = require("../models/subcategory.schema")

module.exports.getSubcategories = asyncHandler(async (req, res, next) => {
 
    let query
    let data
    let reqQuery = { ...req.query }

    //fiels we dont need in filtering
    let removeFields = ["select", "sort", "page", "limit"]
    removeFields.forEach( (param) => delete reqQuery[param] )

    let pagination = {}
    query = SubcategoriesModel.find(reqQuery)

    //pagination
    let page = parseInt(req.query.page, 10) || 1
    let limit = parseInt(req.query.limit, 10) || 2
    let startIndex = (page - 1) * limit
    let endIndex = page * limit
    let total = SubcategoriesModel.countDocuments() 

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

module.exports.createSubcategory = asyncHandler( async (req, res) => {

    let data = await new SubcategoriesModel(req.body).save()
    res.status(201).send({success:true, data:data})    

})