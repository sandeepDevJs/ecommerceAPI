const jwt = require("jsonwebtoken")
const config = require("../../config")

/**
 * @param  {Object} data
 * @desc pass the data object need to be included in 
 *       and returns the object containig token data and status
 */
module.exports.generateToken = async (data) => {
    try{
        let tokenData = await jwt.sign(data, config.privateKey, {expiresIn: "1h"})
        return {status:1, token: tokenData}
    }catch(err){
        return { status : 0, error:err}
    }
}
/**
 * @param  {String} userToken
 * @desc  verifies the token & returns the result object containing decoded data Or error if occurres
 */
module.exports.verifyToken = (userToken) => {
    let data = jwt.verify(userToken, config.privateKey, (err, decoded) => {
        if (err) {
            console.error("An Error Occurred While Verifying Token")
            console.error(err.message);
            return { status: 0,  error: err.message }
        }

        return {status:1, data: decoded}
    })

    return data;
}