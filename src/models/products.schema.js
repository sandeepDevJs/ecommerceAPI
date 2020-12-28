const mongoose = require('mongoose');
const slugify = require("slugify")
var products = new mongoose.Schema({

        // product_image: {
        //     type: String,
        //     required: [true, "product image is required"]
        // },

        title: {
            type: String, 
            required: [true, "Title Is Required"]
        },
        description: {
            type: String, 
            required: [true, "description is required"]
        },
        category: {
            type: String,
            required: [true, "category is required"]
        },
        subcategory: {
            type: String,
            required: true
        },
        manufacture_details:{
            model_number: {
                type: String,
                required: true
            },
            release_date: {
                type: Date,
                required: true
            }
        },
        slug:{
            type:String,
            unique:[true, "Product Already Exists"]
        },
        quantity: {
            type: Number,
            required: true,
            min:[0, "Out Of Stock!!"]
        },
        pricing: {
            price: {
                type: Number, 
                required: true
            }
        }
    }); 

    //before saving product create slug
    products.pre("save", async function(next){
        this.slug = slugify(this.title, {lower:true, strict:true})
        let category = await this.model("categories").findById(this.category)
        let subcategory = await this.model("subcategories").findById(this.subcategory)
        this.category = category.category
        this.subcategory = subcategory.subcategory
        next()
    })

    //before updating check if it updating title
    products.pre("updateOne", async function(next){
        let dataToBeUpdated = this.getUpdate()
        if (dataToBeUpdated.title) {
            //then update slug
            dataToBeUpdated.slug = slugify(dataToBeUpdated.title, {lower:true, strict:true})
            this.updateOne({}, dataToBeUpdated).exec()
        }
        next()
    })

    module.exports = mongoose.model("products", products)