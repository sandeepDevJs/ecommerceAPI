
var mongoose = require('mongoose');
var subcategory = mongoose.Schema({
    subcategory: {
        type: String, 
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId, 
        required: true
    }
}); 