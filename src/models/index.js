const ProductsModel = require("./products.schema")
const CategoriesModel = require("./category.schema")
const SubcategoriesModel = require("./subcategory.schema")
const usersModel = require("./users.schema")
const ErrorResponse = require("../utils/errorResponse")

function getModel(modelName) {
    switch (modelName) {
        case "products":
            return ProductsModel

        case "categories":
            return CategoriesModel

        case "subcategories":
            return SubcategoriesModel

        case "uers":
            return usersModel
        default:
            return false
    }
}

module.exports.getData = async (Model, id, filters={}) =>{

    let query, data
    Model = getModel(Model)

    //if model name is invalid then throw an error
    if(!Model) throw new ErrorResponse("Internal error!!", 500)

    //search by id.
    if (id) {
        query = Model.findById(id)
    }
    else{
        query = Model.find(filters) //else search by filters, if filters are not given it will return all data.
    }
    // execute query.
    data = await query.select("-__v")
    //if no data found then throw an error
    if (!data) {
        throw new ErrorResponse(`No Data Found ${ (id) ? "Associated To "+id : "!"}`, 400)
    }
    return data
}

module.exports.deleteData = async (ModelName, id) => {
    let data, Model
    Model = getModel(ModelName)
    //if model name is invalid then throw an error
    if(!Model) throw new ErrorResponse("Internal error!!", 500)

    //if model name is invalid then throw an error
    if(!id) throw new ErrorResponse("We Need Id As A Parameter To Delete Data.", 400)

    //if no data found then it will throw an error
    data = await this.getData(ModelName, id)

    //delete data
    await data.remove()
    return true
}

module.exports.createData = async (ModelName, anyData) => {

    let data, Model
    Model = getModel(ModelName)
    //if model name is invalid then throw an error
    if(!Model) throw new ErrorResponse("Internal error!!", 500)

    data = await new Model(anyData).save()
    return data;
}

module.exports.updateData = async (ModelName, id, anyData) => {

    let data, Model
    Model = getModel(ModelName)
    //if model name is invalid then throw an error
    if(!Model) throw new ErrorResponse("Internal error!!", 500)

    //if model name is invalid then throw an error
    if(!id) throw new ErrorResponse("We Need Id As A Parameter To Delete Data.", 400)
    
    //if no data found then it will throw an error
    data = await this.getData(ModelName, id)

    data = await Model.updateOne({_id:id}, anyData)
    return data.nModified
}

module.exports.getModel = getModel