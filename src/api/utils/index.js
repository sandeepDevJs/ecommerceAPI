/**
 * 
 * sends response to the user
 * 
 * @params 
 * res -> response object
 * data -> data type object containing
 *          -httpCode
 *          -status
 *          -message
 *          -data
 * 
 * 
 * **/

module.exports.customResponse = (res, data) =>{
    
    res.status(data.httpCode)
       .send({
           status: data.status,
           message:data.message, 
           data: data.data
        })

}