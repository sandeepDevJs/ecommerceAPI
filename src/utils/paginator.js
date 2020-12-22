const { getModel } = require("../models")

module.exports = async (Model, reqQuery, path=null, select="-__v -_id") => {

    Model = getModel(Model)

    let filters = { ...reqQuery }
    let query;

    //fiels we dont need in filtering
    let removeFields = ["select", "sort", "page", "limit"]
    removeFields.forEach( (param) => delete filters[param] )

    query = Model.find(filters)
    if (path) {
        query.populate({path: path, select:select})
    }

    let pagination = {}
    let data;

    //pagination
    let page = parseInt(reqQuery.page, 10) || 1
    let limit = parseInt(reqQuery.limit, 10) || 3
    let startIndex = (page - 1) * limit
    let endIndex = page * limit
    let total = await Model.countDocuments() 

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

    //if any select opertaions
    if (reqQuery.select) {
        let fields = reqQuery.select.split(",").join(" ")
        query.select(fields)
    }

    //if any sort operation
    if (reqQuery.sort) {
        let sortBy = reqQuery.sort.split(",").join(" ")
        query = query.sort(sortBy)
    }

    data = await query.select("-__v")
    return { pagination, data }
}