let ErrorResponse = require("../utils/errorResponse");
var mongoose = require("mongoose");
var ReviewSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		maxlength: 100,
		required: [true, "Title Is Required"],
	},
	text: {
		type: String,
		required: [true, "Add Some Text."],
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: [true, "Rating is required."],
	},
	createdAdd: {
		type: Date,
		default: Date.now,
	},
	productId: {
		type: mongoose.Types.ObjectId,
		ref: "products",
		required: true,
	},

	user: {
		type: mongoose.Types.ObjectId,
		ref: "users",
		required: true,
	},
});

ReviewSchema.pre("save", async function (next) {
	try {
		let data = this.model("products").findById(this.productId);
		if (!data) {
			next(new ErrorResponse("No Data Found Associated To Product Id!", 404));
			return false;
		}
		next();
	} catch (error) {
		next(error);
	}
});

ReviewSchema.statics.getAverageRating = async function (productId) {
	const obj = await this.aggregate([
		{
			$match: { productId },
		},
		{
			$group: {
				_id: "$productId",
				avgRating: { $avg: "$rating" },
			},
		},
	]);

	try {
		await this.model("products").findByIdAndUpdate(productId, {
			avgRating: obj[0].avgRating,
		});
	} catch (error) {
		next(error);
	}
};

ReviewSchema.post("save", async function () {
	await this.constructor.getAverageRating(this.productId);
});

ReviewSchema.post("remove", async function (doc, next) {
	await this.constructor.getAverageRating(this.productId);
	next();
});

ReviewSchema.post("updateOne", async function (doc, next) {
	// console.log(this.getQuery());
	let d = await this.model.findById(this.getQuery()._id);
	await this.model.getAverageRating(d.productId);
	next();
});

module.exports = mongoose.model("reviews", ReviewSchema);
