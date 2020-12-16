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
            }),

    logIn : Joi.object({
                email: Joi.string().email().max(50).min(8).trim().required(),
                password : Joi.string().max(12).min(5).trim().required()
            }),

    update : Joi.object({
                name: Joi.string().max(20).min(4).trim(),
                email: Joi.string().email().max(50).min(8).trim(),
                password: Joi.string().max(12).min(5).trim(),
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
    
}

module.exports.idValidator = (req, res, next) => {

    let id = req.params.id

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return next()    
    } else {
        customResponse(res, getReturnObj({message: "Invalid ID!!", httpCode:400}))
        return false    
    }

}

