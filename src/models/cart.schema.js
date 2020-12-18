var mongoose = require('mongoose');
var cart = mongoose.Schema({
    total: {
        type: Number, 
        required: true
    },
    status: {
        type: Boolean, 
        required: true
    },
    products: [
        {
            product_id: {
                type: Schema.Types.ObjectId, 
                required: true
            },
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
            subcategoory: {
                type: String, 
                required: true
            },
            quantity: {
                type: Number, 
                required: true
            },
            price: {
                type: Number, 
                required: true
            }
        }
    ]
}); 