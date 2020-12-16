const verifyUser = require("../utils/jwtUtility").verifyToken
const { customResponse, getReturnObj } = require("../utils")

//response object for error
let errorResponseObj = {}

/**
 * 
 * @param {String} Usertoken
 * 
 * if error occurres then sets error response object and returns false
 * returns decoded data if everything is fine
 * 
 */

function verifyToken(Usertoken=null){

    let tokenData = verifyUser(Usertoken)

    //if status is 0 that means an error occurred & set error response object
    if (!tokenData.status) {
        errorResponseObj = getReturnObj({message: tokenData.error, httpCode:403})
        return false
    }

    //everything is fine & return decoded data
    return tokenData.data

} 

/**
 * 
 * Authorize User & sets requests object
 * 
 */
module.exports.checkUser = (req, res, next) => {

    if (!req.headers.authorization) {
        errorResponseObj = getReturnObj({message: "We Need Token", httpCode:401})
        customResponse(res, errorResponseObj)
        return false
    }

    let Usertoken = req.headers.authorization.split(" ")[1]
    let tokenData = verifyToken(Usertoken)

    //if passes the verification
    if (tokenData !== false) {
        req.userData = tokenData
        next()
        return false
    }

    //verification failed & response with error
    customResponse(res, errorResponseObj)
}

/**
 * 
 * checks if user is admin
 * 
 * 
 */
module.exports.authAdmin = (req, res, next) => {

    //if not admin
    if (!req.userData.isAdmin) {
        errorResponseObj = getReturnObj({message: "You Are Not Authorized For Particular Request", httpCode:401})
        customResponse(res, errorResponseObj)
        return false
    }
    next()
    return true

}