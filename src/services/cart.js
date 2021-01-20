/**
 *
 * This File Holds all services related to carts
 *
 * these functions are imported into routes
 * ===============================================
 * PATH: api/carts
 *
 */

const crudOPs = require("../models/index");
const asyncHandler = require("../api/middlewares/asyncHandler");
const cartModel = require("../models/cart.schema");
const productModel = require("../models/products.schema");

/**
 * Access : logged in user
 */

module.exports.addToCart = asyncHandler(async (req, res, next) => {
	let product_id = req.params.productId,
		userId = req.userData.id;

	let quantity = req.query.quantity || 1;

	let cart = await cartModel.findOne({ userId });

	//if no cart then create one
	if (!cart) {
		cart = await crudOPs.createData("carts", { userId });
	}

	let isInStock = await productModel.isInStock(product_id);

	//if not in stock
	if (!isInStock) {
		return res.status(400).send({ success: 0, message: "Out Of Stock!" });
	}

	//Add product
	await cartModel.updateOne(
		{ _id: cart._id, userId },
		{ $addToSet: { products: { productId: product_id, quantity } } },
		{ runValidators: true }
	);
	//update product Quantity
	await crudOPs.updateData("products", product_id, {
		$inc: { quantity: -quantity },
	});

	return res
		.status(200)
		.send({ success: true, message: "Product Added To Cart" });
});

//updates quantity
/**
 * updates quantity
 * path: carts/:productId?icrement=1
 *
 * Access : logged in user
 */

module.exports.updateCart = asyncHandler(async (req, res, next) => {
	let productId = req.params.productId,
		userId = req.userData.id,
		increment = req.query.increment,
		decrement = req.query.decrement;
	let quantity;

	if (!increment && !decrement) {
		increment = 1;
	}

	let cartData = await crudOPs.getData("carts", 0, {
		userId,
		"products.productId": productId,
	});

	if (increment) {
		quantity = increment;

		if (!(await productModel.compareStock(productId, quantity))) {
			res
				.status(400)
				.send({ success: false, message: "We Don't Have Enough Stock!!" });

			return false;
		}
		//update cart
		let d = await cartModel.updateOne(
			{
				_id: cartData[0]._id,
				"products.productId": productId,
			},
			{
				$inc: { "products.$.quantity": quantity },
			},
			{ runValidators: true }
		);

		//decrease quantity
		await crudOPs.updateData("products", productId, {
			$inc: { quantity: -quantity },
		});

		return res
			.status(200)
			.send({ success: true, message: "Quantity Updated!!" });
	} else if (decrement) {
		quantity = decrement;

		if (!(await cartModel.canDecrement(userId, productId, quantity))) {
			res.status(200).send({
				success: 0,
				message: "you are decrementing more than you have!!",
			});
			return false;
		}
		//update cart
		let d = await cartModel.updateOne(
			{
				_id: cartData[0]._id,
				"products.productId": productId,
			},
			{
				$inc: { "products.$.quantity": -quantity },
			},
			{ runValidators: true }
		);

		//Increase quantity
		await crudOPs.updateData("products", productId, {
			$inc: { quantity: quantity },
		});

		return res
			.status(200)
			.send({ success: true, message: "Quantity Updated!!" });
	}
});

/**
 * Access : logged in user
 */

module.exports.deleteItem = asyncHandler(async (req, res, next) => {
	let productId = req.params.productId,
		userId = req.userData.id;
	let productDataInCart;

	let cartData = await crudOPs.getData("carts", 0, {
		userId,
		"products.productId": productId,
	});

	productDataInCart = cartData[0].products.find(
		(productsDet) => productsDet.productId == productId
	);

	await crudOPs.updateData("carts", cartData[0]._id, {
		$pull: { products: { productId } },
	});
	await crudOPs.updateData("products", productId, {
		$inc: { quantity: productDataInCart.quantity },
	});
	res.send({ success: true, message: "Data Deleted Successfully!!" });
});

/**
 * Access : logged in user
 */

module.exports.getcart = asyncHandler(async (req, res, next) => {
	let userId = req.userData.id;
	let data = await cartModel.findOne({ userId }).populate("products.productId");

	res.send({ success: true, data });
});
