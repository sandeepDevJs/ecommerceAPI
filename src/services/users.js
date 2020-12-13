const usersModel = require("../models/users.schema")
const crud = require("./crud");
const jwt = require("../api/utils/jwtUtility")

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


//user Sign Up

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

    let isAdmin = (!insertedData.isAdmin) ? 0 : insertedData.isAdmin
    let token =  await jwt.generateToken({ name : insertedData.name, email:insertedData.email, isAdmin:isAdmin })
    console.error(token + "  : user service");

    if (!token.status) {
        return {
            status:0,
            message:token.error,
            httpCode:401,
            data: 0
        }
    }

    return {
        status:1,
        message:"Registered Successfully!",
        httpCode:200,
        data: token.token
    }

}

