
var mongoose = require('mongoose');
var users = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
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
        type: Boolean
    },
    resetPasswordToken: {
        type: String
    },
    tokenExpiry: {
        type: Date
    }
}); 

module.exports = mongoose.model("users", users)