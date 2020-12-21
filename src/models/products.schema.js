const mongoose = require('mongoose');
const slugify = require("slugify")
var products = new mongoose.Schema({
        title: {
            type: String, 
            required: [true, "Title Is Required"]
        },
        description: {
            type: String, 
            required: [true, "description is required"]
        },
        category: {
            type: mongoose.Types.ObjectId, 
            ref:"categories",
            required: [true, "category is required"]
        },
        subcategory: {
            type: mongoose.Types.ObjectId, 
            ref:"subcategories",
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
        slug:{
            type:String,
            unique:[true, "Product Already Exists"]
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

    products.pre("save", function(next){
        this.slug = slugify(this.title, {lower:true, strict:true})
        next()
    })


    products.pre("updateOne", async function(next){
        let dataToBeUpdated = this.getUpdate()
        if (dataToBeUpdated.title) {
            dataToBeUpdated.slug = slugify(dataToBeUpdated.title, {lower:true, strict:true})
            this.updateOne({}, dataToBeUpdated).exec()
        }
        next()
    })

    module.exports = mongoose.model("products", products)