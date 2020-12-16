/**
 * 
 * This File (users.js) is responsible for all user related services
 * 
 * **/


const usersModel = require("../models/users.schema")
const crud = require("./crud");
const jwt = require("../api/utils/jwtUtility")
const bcrypt = require("bcrypt")
const getReturnObj = require("../api/utils").getReturnObj;

/**
 * @param  {String} email=null
 * @desc   Takes email string, returns false if no email found
 *         else returns users complete data
 */
async function isEmailExists(email=null) {
    if (email == undefined ) {
        return false
    }
    let isEmailExists = await crud.get(usersModel, 0 , {email:email})
    //email exists
    if (isEmailExists != undefined) {
        return isEmailExists
    }
    //else
    return false

}


/**
 * 
 * @param  {String} id=null
 * @desc   if id is passed then it'll find by id else returns all user's data
 * 
 */
module.exports.getUser = async (id=null) => {
    let data = (id === null) ? await crud.get(usersModel) : await crud.get(usersModel, id)

    if (data == undefined) {
        return getReturnObj({ message:"no data found", httpCode:404})
    }

    return getReturnObj({ status: 1, message:"All Users", data: data}) 

}

/**
 * @param  {Object} data
 * @desc   Registers New User (Proper Validated Data Need To Be Passed)
 */
module.exports.signUp = async (data={email : null}) => {
    try{

        let email = await isEmailExists(data.email)
        if ( email !== false ) {
            return getReturnObj({ message:"Provided Email Is Already Registered.", httpCode:400})
        }
        //updating user's password to encrypted password
        let salt = await bcrypt.genSalt(10)
        data.password = await bcrypt.hash(data.password, salt)

        let insertedData = await crud.create(usersModel, data)
        if (!inseterdData) {
            return getReturnObj({ message:"An Error Occurred While Registering", httpCode:500})
        }
        let token =  await jwt.generateToken({ name : insertedData.name, email:insertedData.email, isAdmin:insertedData.isAdmin })
        //if token generation fails
        if (!token.status) {
            return getReturnObj({ message:token.error, httpCode:401})
        }
        //return object of token, message, httpCode & status
        return getReturnObj({status:1, message:"Registered Successfully", httpCode:201, data: token.token})

    }catch(err){
        console.log(err)
        return getReturnObj({ message:"An Error Occurred While Registering", httpCode:500})
    }


}

/**
 * @param  {Object} credentials
 * @desc   Takes credentials and returns token if logged in successfully
 *         else return error Object
 */
module.exports.login = async(credentials = {email : null}) => {
    try {
        let data = await isEmailExists(credentials.email)
        if (! data ) {
            return getReturnObj({ message:"Provided Email Is Not Registered.", httpCode:400})
        }
        let isMatched = bcrypt.compareSync(credentials.password, data.password);
        if (isMatched) {
            
            let token = await jwt.generateToken({name: data.name, email:data.email, isAdmin:data.isAdmin})
            if (!token.status) {
                return getReturnObj({message: "An UnHandled Error Occurred While Generating Token", httpCode:500})
            }
            return getReturnObj({status:1, message:"Logged In!, Get Your Token In Data Field", data:token.token})
        }

        return getReturnObj({message:"Invalid Credentials", httpCode:401})

    } catch (error) {
        console.log(error)
        return getReturnObj({message: "An UnHandled Error Occurred While Logging In", httpCode:500})
    }
}

module.exports.UserUpdate = async (id, data) => {
    try {
        let isIdExists = await crud.get(usersModel, id)
        if (isIdExists == undefined) {
            return getReturnObj({message:"No Data Found Associated To Provided ID.", httpCode: 404})
        }
        let updatedData = await crud.update(usersModel, {_id : id}, data)
        if (!updatedData) {
            return getReturnObj({ message: "An Unhandled Error Occurred!!", httpCode:500})    
        }
        return getReturnObj({status: 1, message: "Data Updated Successfully!!!", data:updatedData})

    } catch (error) {
        console.log(error)
        return getReturnObj({message: "An UnHandled Error Occurred While Updating.", httpCode:500})
    }
}
