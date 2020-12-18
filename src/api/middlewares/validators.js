const Joi = require("joi")
const ErrorResponse = require("../../utils/errorResponse")
let schemas = {

    signUp : Joi.object({
                name: Joi.string().min(4).max(15).trim().required(),
                email: Joi.string().email().max(50).min(8).trim().required(),
                password: Joi.string().max(12).min(5).trim().required(),
                address: Joi.string().min(8).max(30).trim().required(),
                isAdmin: Joi.boolean()
            }),

    update : Joi.object({
                name: Joi.string().max(20).min(4).trim(),
                email: Joi.string().email().max(50).min(8).trim(),
                password: Joi.string().max(12).min(5).trim(),
                address: Joi.string().max(30).min(6).trim()
            }),

    productCreate: Joi.object({

                
        
            })
}

function validator(validationType, data) {
 
    let schema = schemas[validationType]
        let { error } = schema.validate(data)
        if (error) {
            return error.message
        }
    return true
    
}

module.exports.signUpValidator = (req, res, next) => {
    let isValidationPassed = validator("signUp", req.body)
    if (isValidationPassed !== true) {
        return next(new ErrorResponse(isValidationPassed, 400)) 
    }
    next()  
}

module.exports.updateValidator = (req, res, next) => {
    let isValidationPassed = validator("update", req.body)
    if (isValidationPassed !== true) {
        return next(new ErrorResponse(isValidationPassed, 400)) 
    }
    next()
}