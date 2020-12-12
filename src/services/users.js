const usersModel = require("../models/users.schema")
const crud = require("./crud");

module.exports.getUser = async (id=null) => {
    let data = (id === null) ? await crud.get(usersModel) : await crud.get(usersModel, id)
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

module.exports.signUp = async (data) => {

    let insertedData = await crud.create(usersModel, data)
    if(!insertedData){
        return {
            status:0,
            message:"An error occurred while registering",
            httpCode:500,
            data: insertedData
        }
    }
    return {
        status:1,
        message:"Registered Successfully!",
        httpCode:200,
        data: insertedData
    }

}

