var mongoose = require('mongoose');
var cart = mongoose.Schema({

    userId:{
        type: mongoose.Types.ObjectId,
        required:true
    },

    total: {
        type: Number,
    },
    status: {
        type: Boolean, 
        default:0
    },
    products: [
        {
            productId:{
                type: mongoose.Types.ObjectId, 
                ref:"products",
                required: true
            },

            quantity:{
                type:Number,
                default:1,
                min:[0, "quantity cannot be less than 0"]
            }
        },
    ]
}); 

module.exports = mongoose.model("carts", cart)