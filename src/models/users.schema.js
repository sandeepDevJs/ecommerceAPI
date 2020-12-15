
var mongoose = require('mongoose');
var users = mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is required."]
    },
    email: {
        type: String, 
        unique: [true, "Email must be unique"],
        required: [true, "Email is required."]
    },
    password: {
        type: String, 
        required: [true, "password is required"]
    },
    address: {
        street: {
            type: String, 
            required: [true, "street is required"]
        },
        pincode: {
            type: Number, 
            required: [true, "pincode is required"]
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