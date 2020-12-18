const mongoose = require('mongoose');
var products = mongoose.Schema({
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        category: {
            type: String, 
            required: true
        },
        subcategory: {
            type: String,
            required: true
        },
        manufacture_details: {
            model_number: {
                type: String
            },
            release_date: {
                type: Date
            }
        },
        quantity: {
            type: Number,
            required: true
        },
        pricing: {
            price: {
                type: Number, 
                required: true
            }
        }
    }); 


    module.exports = mongoose.model("products", products)