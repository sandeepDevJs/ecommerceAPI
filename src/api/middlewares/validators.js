const customResponse = require("../utils").customResponse
const Joi = require("joi")
let schema = undefined
let errorResponseObj = {
    status:0,
    message:"no data found",
    httpCode:400,
    data:null
}

module.exports.signUpValidations = (req, res, next) =>{

    schema = Joi.object({
        name: Joi.string().max(20).min(4).trim().required(),
        email: Joi.string().email().max(50).min(8).trim().required(),
        password: Joi.string().max(12).min(8).trim().required(),
        address: {
            street : Joi.string().max(30).min(6).trim().required(),
            pincode: Joi.number().integer().min(6).required()
        }
    })

    let { error } = schema.validate(req.body)
    if (error) {
        errorResponseObj.message = error.message
        customResponse(res, errorResponseObj)
        return false
    }
    next()

}