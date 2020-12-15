
var mongoose = require('mongoose');
var users = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        unique:true,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    address: {
        street: {
            type: String, 
            required: true
        },
        pincode: {
            type: Number, 
            required: true
        }   
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    tokenExpiry: {
        type: Date
    }
}); 

module.exports = mongoose.model("users", users)