const jwt = require("jsonwebtoken")
const config = require("../../config")

/**
 * 
 * Generate New Token with expiry of 1 hr
 * @params data => Data To Be Included.
 * 
 * **/
module.exports.generateToken = async (data) => {
    try{
        let tokenData = await jwt.sign(data, config.privateKey, {expiresIn: "1h"})
        return {status:1, token: tokenData}
    }catch(err){
        return { status : 0, error:err}
    }
}

/**
 * 
 * Verify Token
 * @params userToken => Token To Be Verified.
 * 
 * **/
module.exports.verifyToken = (userToken) => {
    let data = jwt.verify(userToken, config.privateKey, (err, decoded) => {
        if (err) {
            console.error("An Error Occurred While Generating Token")
            console.error(err.message);
            return { status: 0,  error: err.message }
        }

        return {status:1, data: decoded}
    })

    return data;
}