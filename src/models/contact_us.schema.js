
var mongoose = require('mongoose');
var contact_us = mongoose.Schema({
    email: {
        type: String, 
        required: true
    },
    query: {
        type: String, 
        required: true
    }
}); 