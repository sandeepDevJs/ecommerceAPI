<<<<<<< HEAD
const Joi = require("joi")
const ErrorResponse = require("../../utils/errorResponse")
let schemas = {

    signUp : Joi.object({
                name: Joi.string().min(4).max(15).trim().required(),
                email: Joi.string().email().max(50).min(8).trim().required(),
                password: Joi.string().max(12).min(5).trim().required(),
                address: Joi.string().min(8).max(30).trim().required(),
                isAdmin: Joi.boolean()
=======
const {customResponse, getReturnObj} = require("../utils")
const Joi = require("joi")
let schemas = {

    signUp : Joi.object({
                name: Joi.string().max(20).min(4).trim().required(),
                email: Joi.string().email().max(50).min(8).trim().required(),
                password: Joi.string().max(12).min(5).trim().required(),
                address: {
                    street : Joi.string().max(30).min(6).trim().required(),
                    pincode: Joi.number().integer().min(6).required()
                }
>>>>>>> 0cb780fb629563d9df9cb9cff2bf9716aa302643
            }),

    logIn : Joi.object({
                email: Joi.string().email().max(50).min(8).trim().required(),
                password : Joi.string().max(12).min(5).trim().required()
            }),

    update : Joi.object({
                name: Joi.string().max(20).min(4).trim(),
                email: Joi.string().email().max(50).min(8).trim(),
                password: Joi.string().max(12).min(5).trim(),
<<<<<<< HEAD
                address: Joi.string().max(30).min(6).trim()
            }),
    
    query: Joi.object({
                name: Joi.string().max(8).min(1).trim(),
                email: Joi.string().email().max(22).min(1).trim(),
                address: Joi.string().max(30).min(6).trim()
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

module.exports.logInValidator = (req, res, next) =>{

    let isValidationPassed = validator("logIn", req.body)
    if (isValidationPassed !== true) {
        
        return next(new ErrorResponse(isValidationPassed, 400)) 
    }
    next()  
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
=======
                address: {
                    street : Joi.string().max(30).min(6).trim(),
                    pincode: Joi.number().integer().min(6)
                }
            }),

}


module.exports.validator = (req, res, next, validationType) =>{

    let schema = schemas[validationType]
    let { error } = schema.validate(req.body)
    if (error) {
        customResponse(res, getReturnObj({message: error.message, httpCode:400}))
        return false
    }
    next()
    
>>>>>>> 0cb780fb629563d9df9cb9cff2bf9716aa302643
}

module.exports.idValidator = (req, res, next) => {

    let id = req.params.id

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return next()    
    } else {
<<<<<<< HEAD
        return next(new ErrorResponse("Invalid Id", 400))  
=======
        customResponse(res, getReturnObj({message: "Invalid ID!!", httpCode:400}))
        return false    
>>>>>>> 0cb780fb629563d9df9cb9cff2bf9716aa302643
    }

}

<<<<<<< HEAD
module.exports.queryValidator = (req, res, next) => {
    if (req.query) {
        let isValidationPassed = validator("query", req.query)
        if (isValidationPassed !== true) {
            return next(new ErrorResponse(isValidationPassed, 400)) 
        }
        return next() 
    }
    next()
}

=======
>>>>>>> 0cb780fb629563d9df9cb9cff2bf9716aa302643
