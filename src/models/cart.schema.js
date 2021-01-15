var mongoose = require("mongoose");
const arrayUniquePlugin = require("mongoose-unique-array");
var cart = mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		required: true,
	},

	total: {
		type: Number,
	},
	status: {
		type: Boolean,
		default: 0,
	},
	products: [
		{
			productId: {
				type: mongoose.Types.ObjectId,
				ref: "products",
				required: true,
				unique: true,
			},

			quantity: {
				type: Number,
				default: 1,
				min: [0, "quantity cannot be less than 0"],
			},
		},
	],
});

cart.index({ userId: 1 }, { unique: true });
cart.plugin(arrayUniquePlugin);

cart.pre("updateOne", async function (next) {
	// await this.model("carts").find();
	console.log(this.query());
	console.log(this.getUpdate());

	next();
});

module.exports = mongoose.model("carts", cart);
