const mongoose = require("mongoose");
const slugify = require("slugify");
const ErrorResponse = require("../utils/errorResponse");

var products = new mongoose.Schema({
	product_image: {
		type: String,
		required: [true, "product image is required"],
	},

	title: {
		type: String,
		required: [true, "Title Is Required"],
	},
	description: {
		type: String,
		required: [true, "description is required"],
	},
	category: {
		type: String,
		required: [true, "category is required"],
	},
	subcategory: {
		type: String,
	},
	manufacture_details: {
		model_number: {
			type: String,
			required: true,
		},
		release_date: {
			type: Date,
			required: true,
		},
	},
	slug: {
		type: String,
		unique: [true, "Product Already Exists"],
	},
	quantity: {
		type: Number,
		required: true,
		min: [0, "Out Of Stock!!"],
	},
	pricing: {
		price: {
			type: Number,
			required: true,
		},
	},

	reviews: [{ type: mongoose.Types.ObjectId, ref: "reviews", default: [] }],

	avgRating: {
		type: Number,
		default: 0,
		min: [0, "Rating can't be less than 0"],
		max: [5, "Rating can't be greater than 5"],
	},
});

//before saving product create slug
products.pre("save", async function (next) {
	this.slug = slugify(this.title, { lower: true, strict: true });
	let category = await this.model("categories").findById(this.category);
	let subcategory = undefined;

	if (this.subcategory) {
		subcategory = await this.model("subcategories").findById(this.subcategory);
	}

	if (!category) {
		next(new ErrorResponse("Category Id Not Found!", 400));
		return false;
	}

	if (subcategory !== undefined) {
		if (!subcategory) {
			next(new ErrorResponse("Subcategory Id Not Found!", 400));
			return false;
		}
	}
	this.category = category.category;
	this.subcategory = subcategory.subcategory;
	next();
});

products.statics.isInStock = async function isInStock(productId) {
	let productData = await this.findById(productId);
	if (parseInt(productData.quantity) <= 0) {
		return false;
	}
	return true;
};

products.statics.compareStock = async function (productId, quantity) {
	let productData = await this.findById(productId);
	if (productData.quantity <= 0) {
		return false;
	}
	if (productData.quantity < quantity) {
		return false;
	}
	return true;
};

//before updating check if it updating title
products.pre("updateOne", async function (next) {
	let dataToBeUpdated = this.getUpdate();
	if (dataToBeUpdated.title) {
		//then update slug
		dataToBeUpdated.slug = slugify(dataToBeUpdated.title, {
			lower: true,
			strict: true,
		});
		this.updateOne({}, dataToBeUpdated).exec();
	}
	next();
});

module.exports = mongoose.model("products", products);
