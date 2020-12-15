
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
 * @desc returns a object to the services for response objects
 */
module.exports.getReturnObj = (obj) => {

    obj.status = (!obj.status) ? 0 : obj.status
    obj.message = (!obj.message) ? "An Error Occurred" : obj.message
    obj.httpCode = (!obj.httpCode) ? 200 : obj.httpCode
    obj.data = (!obj.data) ? null : obj.data

    return obj
}
