const usersModel = require("../models/users.schema")
const crud = require("./crud");
const jwt = require("../api/utils/jwtUtility")
const bcrypt = require("bcrypt")
const getReturnObj = require("../api/utils").getReturnObj


async function isEmailExists(email=null) {
    if (email == undefined ) {
        return false
    }
    let isEmailExists = await crud.get(usersModel, 0 , {email:email})
    //email exists
    if (isEmailExists != undefined) {
        return true
    }
    //else
    return false

}

//Get User By Id or All data
module.exports.getUser = async (id=null) => {
    let data = (id === null) ? await crud.get(usersModel) : await crud.get(usersModel, id)

    if (data == undefined) {
        return getReturnObj({ message:"no data found", httpCode:404})
    }

    return getReturnObj({ status: 1, message:"All Users", data: data}) 

}


//user Sign Up
module.exports.signUp = async (data) => {
    try{

        if ( await isEmailExists(data.email)) {
            return getReturnObj({ message:"Provided Email Is Already Registered.", httpCode:400})
        }

        //updating user's password to encrypted password
        let salt = await bcrypt.genSalt(10)
        data.password = await bcrypt.hash(data.password, salt)

        let insertedData = await crud.create(usersModel, data)

        let token =  await jwt.generateToken({ name : insertedData.name, email:insertedData.email, isAdmin:insertedData.isAdmin })

        //if token generation fails
        if (!token.status) {
            return getReturnObj({ message:token.error, httpCode:401})
        }

        //return object of token, message, httpCode & status
        return getReturnObj({status:1, message:"Registered Successfully", data: token.token})

    }catch(err){
        console.log(err)
        return getReturnObj({ message:"An Error Occurred While Registering", httpCode:500})
    }


}


module.exports.login = async(credentials=undefined) => {
    try {
        if (! await isEmailExists(credentials.email)) {
            return getReturnObj({ message:"Provided Email Is Not Registered.", httpCode:400})
        }

        let isMatched = bcrypt.compareSync(credentials.password, data.password);
        
        if (isMatched) {
            
            let token = await jwt.generateToken({name: data.name, email:data.email, isAdmin:data.isAdmin})
            if (!token.status) {
                return getReturnObj({message: "An UnHandled Error Occurred While Generating Token", httpCode:500})
            }
            return getReturnObj({status:1, message:"Logged In!, Get Your Token In Data Field", httpCode:200, data:token.token})
        }

        return getReturnObj({message:"Invalid Credentials", httpCode:401})

    } catch (error) {
        console.log(error)
        return getReturnObj({message: "An UnHandled Error Occurred While Logging In", httpCode:500})
    }
}
