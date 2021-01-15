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

ReviewSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model("reviews", ReviewSchema);
