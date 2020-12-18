
var mongoose = require('mongoose');
var category = mongoose.Schema({
    category: {
        type: String, 
        required: true
    }
}); 

module.exports.category = mongoose.model("category", category)