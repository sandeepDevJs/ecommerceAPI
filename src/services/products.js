const productsModel = require("../models/products.schema")
const crud = require("./crud")

module.exports.getProducts = async (id=null) => {

    let data = await crud.get(productsModel)
    if (data === false || data == "") {
        return {
            status:0,
            message:"no data found",
            httpCode:404,
            data:null
        }
    }
    return {
        status:1,
        message:"data found",
        httpCode:200,
        data: data
    }

}