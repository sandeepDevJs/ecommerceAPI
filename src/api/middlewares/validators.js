const {customResponse, getReturnObj} = require("../utils")
const Joi = require("joi")
let schema = undefined

module.exports.signUpValidations = (req, res, next) =>{

    schema = Joi.object({
        name: Joi.string().max(20).min(4).trim().required(),
        email: Joi.string().email().max(50).min(8).trim().required(),
        password: Joi.string().max(12).min(5).trim().required(),
        address: {
            street : Joi.string().max(30).min(6).trim().required(),
            pincode: Joi.number().integer().min(6).required()
        }
    })

    let { error } = schema.validate(req.body)
    if (error) {
        customResponse(res, getReturnObj({message: error.message, httpCode:400}))
        return false
    }
    next()

}

module.exports.signInValidations = (req, res, next) =>{

    schema = Joi.object({
        email: Joi.string().email().max(50).min(8).trim().required(),
        password : Joi.string().max(12).min(5).trim().required()
    })

    let { error }  = schema.validate(req.body)
    if (error) {
        customResponse(res, getReturnObj({message:error.message, httpCode:400}))
        return false
    }
    next()

}