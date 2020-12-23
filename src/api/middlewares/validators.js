const { Joi } = require("celebrate")
const mongoose = require("mongoose")

module.exports.signUpValidator = { 
    body : Joi.object({
            name: Joi.string().min(4).max(15).trim().required(),
            email: Joi.string().email().max(50).min(8).trim().required(),
            password: Joi.string().max(12).min(5).trim().required(),
            address: Joi.string().min(8).max(30).trim().required(),
            isAdmin: Joi.boolean()
        })
},

module.exports.loginValidator = {
    body : Joi.object({
        email: Joi.string().email().max(50).min(8).trim().required(),
        password: Joi.string().max(12).min(5).trim().required(),
    })
}

module.exports.updateValidator = {

    body : Joi.object({
        name: Joi.string().max(20).min(4).trim(),
        email: Joi.string().email().max(50).min(8).trim(),
        password: Joi.string().max(12).min(5).trim(),
        address: Joi.string().max(30).min(6).trim()
    }),

}

module.exports.createProductValidator = {
    body : Joi.object({

        title: Joi.string().min(4).max(20).trim().required(),
        description: Joi.string().min(10).max(50).trim().required(),
        category: mongoose.Types.ObjectId,
        subcategory: mongoose.Types.ObjectId,
        manufacture_details:{
            model_number: Joi.string().alphanum().required(),
            release_date: Joi.date().required(),
        },
        quantity: Joi.number().min(1).max(100).required(),
        pricing: {
            price: Joi.number().min(200).max(10000).required()
        }
    })
}

module.exports.categoryValidator = {
    body: Joi.object({
        category: Joi.string().min(3).max(16).required(),
    })
}

module.exports.subcategoryValidator = {
    body: Joi.object({
        subcategory: Joi.string().min(3).max(16).required(),
        category_id: mongoose.Types.ObjectId,
        category_id: Joi.required()
    })
}

module.exports.updateSubcategoryValidator = {
    body: Joi.object({
        subcategory: Joi.string().min(3).max(16),
        category_id: mongoose.Types.ObjectId
    })
}

module.exports.updateProductValidator = {
    body : Joi.object({

        title: Joi.string().min(4).max(20).trim(),
        description: Joi.string().min(10).max(50).trim(),
        category: mongoose.Types.ObjectId,
        subcategory: mongoose.Types.ObjectId,
        manufacture_details:{
            model_number: Joi.string().alphanum().required(),
            release_date: Joi.date().required(),
        },
        quantity: Joi.number().min(0).max(1000),
        pricing: {
            price: Joi.number().min(200).max(10000)
        }
    })
}
