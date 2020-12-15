
/**
 * 
 * This file is carries utility functions.
 * functions that are needed more often
 * 
 * */

/**
 * @param  {Response} res
 * @param  {Object} data
 * 
 * sends response to the user
 */
module.exports.customResponse = (res, data) =>{
    
    res.status(data.httpCode)
       .send({
           status: data.status,
           message:data.message, 
           data: data.data
        })
}
/**
 * @param  {Object} obj
 * @desc   return object of token, message, httpCode & status
 *         to the services for response object
 */
module.exports.getReturnObj = (obj) => {

    obj.status = (!obj.status) ? 0 : obj.status
    obj.message = (!obj.message) ? "An Error Occurred" : obj.message
    obj.httpCode = (!obj.httpCode) ? 200 : obj.httpCode
    obj.data = (!obj.data) ? null : obj.data

    return obj
}
