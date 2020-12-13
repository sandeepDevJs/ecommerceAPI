const verifyUser = require("../utils/jwtUtility").verifyToken
const customResponse = require("../utils").customResponse

//response object for error
let errorResponseObj = {
    status:0,
    message:"no data found",
    httpCode:400,
    data:null
}

/**
 * 
 * @param {String} Usertoken
 * 
 * if error occurres then sets error response object and returns false
 * returns decoded data if everything is fine
 * 
 */

function verifyToken(Usertoken){

    let tokenData = verifyUser(Usertoken)

    //if status is 0 that means an error occurred & set error response object
    if (!tokenData.status) {
        errorResponseObj.status = tokenData.status
        errorResponseObj.message = tokenData.error
        errorResponseObj.httpCode = 403 
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

    let Usertoken = req.headers.authorization.split(" ")[1]
    let tokenData = verifyToken(Usertoken)

    //if passes the verification
    if (tokenData !== false) {

        //if not admin
        if (!tokenData.isAdmin) {
            errorResponseObj.status = 0
            errorResponseObj.message = "You Are Not Authorized For Particular Request"
            errorResponseObj.httpCode = 401 
            customResponse(res, errorResponseObj)
            return false
        }

        //user is a admin and set userdata in request object
        req.userData = tokenData
        next()
        return true
    }

    
    customResponse(res, errorResponseObj)

}