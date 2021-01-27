let ErrorResponse = require("../utils/errorResponse");
var mongoose = require("mongoose");
var ReviewSchema = new mongoose.Schema({
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

ReviewSchema.index({ user: 1, productId: 1 }, { unique: true });

ReviewSchema.pre("save", async function (next) {
	try {
		let data = await this.model("products")
			.findById(this.productId)
			.populate({ path: "reviews" });
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
		if (obj.length !== 0) {
			await this.model("products").findByIdAndUpdate(productId, {
				avgRating: obj[0].avgRating.toFixed(1),
			});
		} else {
			await this.model("products").findByIdAndUpdate(productId, {
				avgRating: 0,
			});
		}
	} catch (error) {
		throw new ErrorResponse(error);
	}
};

ReviewSchema.post("save", async function () {
	await this.constructor.getAverageRating(this.productId);
});

ReviewSchema.post("remove", async function (doc, next) {
	await this.constructor.getAverageRating(doc.productId);
	next();
});

ReviewSchema.pre("remove", async function (next) {
	await this.constructor.getAverageRating(this.productId);
	next();
});

ReviewSchema.post("updateOne", async function (doc, next) {
	let d = await this.model.findById(this.getQuery()._id);
	await this.model.getAverageRating(d.productId);
	next();
});

ReviewSchema.pre(/^find/, function (next) {
	this.populate({ path: "user" });
	next();
});

module.exports = mongoose.model("reviews", ReviewSchema);
