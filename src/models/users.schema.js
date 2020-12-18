<<<<<<< HEAD
var mongoose = require('mongoose');

var users = new mongoose.Schema({
    name: {
        type: String,
        min: [4, "Name should be atleast 4 characters long"],
        max:[14, "Name cannot be more than 14 characters in length"], 
        validate: {
            validator: function (v) {
                let reg = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/
                return (v == null || v[0].trim().length < 1 || reg.test(v))
            },
            message : "Provided Name Is Invalid."
        },
        required: [true, "Name is required."]
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                return (v == null || v[0].trim().length < 1 || reg.test(v))
            },
            message : "Provided Email Is Invalid."
        },
        unique: [true, "provided email already exists"],
        required: [true, "Email is required."]
    },

    password: {
        type: String, 
        min: [5, "password should be atleast 5 characters long"],
        max:[10, "password cannot be more than 10 characters in length"],
        required: [true, "password is required"]
    },
    address: {
        type: String,
        min: [8, "address should be atleast 8 characters long"],
        max:[30, "address cannot be more than 30 characters in length"],  
        validate: {
            validator: function (v) {
                let reg = /[A-Za-z0-9'\.\-\s\,]/
                return (v == null || v[0].trim().length < 1 || reg.test(v))
            },
            message : "Provided address Is Invalid."
        },
        required: [true, "address is required"]   
    },

=======

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
>>>>>>> 0cb780fb629563d9df9cb9cff2bf9716aa302643
    isAdmin: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    tokenExpiry: {
<<<<<<< HEAD
        type: Date,
=======
        type: Date
>>>>>>> 0cb780fb629563d9df9cb9cff2bf9716aa302643
    }
}); 

module.exports = mongoose.model("users", users)