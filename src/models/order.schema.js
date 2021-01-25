var mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");
var orderSchema = mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "users",
	},

	products: [
		{
			productId: {
				type: mongoose.Types.ObjectId,
				ref: "products",
				required: true,
			},

			quantity: {
				type: Number,
				default: 1,
				min: [0, "quantity cannot be less than 0"],
			},
		},
	],

	total: {
		type: Number,
		required: true,
	},

	shippingAddress: {
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		postalCode: {
			type: Number,
			required: true,
			min: [6, "Postal Code Must Be 6 digits in length"],
		},
		country: {
			type: String,
			required: true,
		},
	},

	paymentMethod: {
		type: String,
		required: true,
	},

	shippingPrice: {
		type: Number,
		required: true,
	},
	taxPrice: {
		type: Number,
		required: true,
	},

	isPaid: {
		type: Boolean,
	},

	isDelivered: {
		type: Boolean,
	},

	deliveredAt: {
		type: Date,
	},

	paidAt: {
		type: Date,
	},

	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

orderSchema.pre("save", async function (next) {
	if (!this.products.length) {
		next(new ErrorResponse("Empty Cart!", 400));
		return false;
	}
	next();
});

module.exports = mongoose.model("orders", orderSchema);
