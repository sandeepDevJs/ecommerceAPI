var mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");
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

cart.index({ userId: 1, "products.productId": 1 }, { unique: true });

cart.pre("updateOne", async function (next) {
	//selector Data
	let userData = this.getQuery();

	//get query
	let changes = this.getUpdate();

	//this means it is adding data to cart
	if (changes.$addToSet) {
		//find cart
		let data = await this.model.findOne({ userId: userData.userId });

		//search if product already in cart
		let product = data.products.find(
			(pd) => pd.productId == changes.$addToSet.products.productId
		);

		//if product find
		if (product) {
			next(
				new ErrorResponse("Try Updating Quantity Product Already Exists.", 400)
			);

			return false;
		}
		next();
		return true;
	} else {
		next();
	}
});

cart.post("updateOne", async function (doc, next) {
	let query = this.getQuery();
	let newQuery = { ...query };
	newQuery["products.quantity"] = 0;

	//delete item if quantity is 0
	await this.model.update(newQuery, {
		$pull: {
			products: { productId: query["products.productId"] },
		},
	});
	await this.model.calculateTotal(query._id);
	next();
});

cart.statics.canDecrement = async function (userId, productId, quantity) {
	let data = await this.findOne({ userId });
	let pQuantity = data.products.find((pd) => pd.productId == productId);

	let rs = pQuantity.quantity - quantity;
	return rs < 0 ? false : true;
};

cart.statics.calculateTotal = async function (id) {
	let data = await this.findOne({ _id: id }).populate({
		path: "products.productId",
	});

	let totalArr = data.products.map(
		(pd) => pd.productId.pricing.price * pd.quantity
	);

	let total = totalArr.reduce((init, val) => init + val);

	data.total = total;
	await data.save();
};

module.exports = mongoose.model("carts", cart);
