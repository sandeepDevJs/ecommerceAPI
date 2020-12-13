
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