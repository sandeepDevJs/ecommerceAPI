const ErrorResponse = require("../utils/errorResponse");
var mongoose = require("mongoose");
var categories = new mongoose.Schema(
	{
		category: {
			type: String,
			required: true,
			unique: [true, "category name already exists"],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		id: false,
	}
);

//Before removing category reset product category
categories.pre("remove", async function (next) {
	await this.model("subcategories").deleteMany({ category_id: this._id });
	await this.model("products").updateMany(
		{ category: this._id },
		{ category: undefined, subcategory: undefined }
	);
	next();
});

//before saving category check if already there
categories.pre("save", async function (next) {
	let allData = await this.model("categories").find({});
	allData.forEach((data) => {
		if (data.category.toLowerCase() === this.category.toLowerCase()) {
			next(new ErrorResponse("Resourse Already Exist!", 400));
		}
	});
	next();
});

categories.virtual("subcategories", {
	ref: "subcategories",
	localField: "_id",
	foreignField: "category_id",
	justOne: false,
});

let cats = mongoose.model("categories", categories);

module.exports = cats;
