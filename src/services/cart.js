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

/**
 * @param  {string} productId
 * @param  {Number} quantity=null
 *
 * @desc   Checks if product is in stock
 *         if quantity provided then it'll
 *         compare quantity with provided one
 */
const inStock = async (productId, quantity = null) => {
	let data = await crudOPs.getData("products", productId);
	if (!quantity) {
		if (data.quantity > 0) {
			return true;
		}
		return false;
	} else {
		if (data.quantity > quantity) {
			return true;
		}
	}
	return false;
};

/**
 * Access : logged in user
 */

module.exports.addToCart = asyncHandler(async (req, res, next) => {
	let product_id = req.params.productId,
		userId = req.userData.id;

	let cart = await cartModel.findOne({ userId });

	if (!cart) {
		cart = await crudOPs.createData("carts", { userId });
	}

	let data = await cartModel.updateOne(
		{ userId },
		{ $addToSet: { products: { productId: product_id } } }
	);

	console.log(data);

	// await crudOPs.updateData("carts", cart._id, {
	// 	$addToSet: { products: [{ productId: product_id }] },
	// });
	// await crudOPs.updateData("products", product_id, { $inc: { quantity: -1 } });

	//if no data found then it will throw an error of status code 400
	//and it will catch by catch block
	// let cartData = await crudOPs.getData("carts", 0, {userId})

	//if product already exists in cart

	//add product id into cart & decrease quantity
	// await crudOPs.updateData("carts", cartData[0]._id, { $push: { products: { productId:product_id } } })
	// await crudOPs.updateData("products", product_id , { $inc: { quantity:-1 } })

	return res
		.status(200)
		.send({ success: true, message: "Product Added To Cart" });

	// } catch (error) {

	//     //if user haven't created any cart then it will create one.
	//     if (error.statusCode === 400 && error.message.startsWith("No Data Found")) {
	//         await crudOPs.createData("carts", {userId, products: [{productId:product_id}] })
	//         await crudOPs.updateData("products", product_id, { $inc: { quantity:-1 } })
	//         return res.status(201).send({ success:true, message:"Product Added To Cart" })
	//     }

	//     //an unhandled error occurred!!
	//     return next(error)
	// }
});

//updates quantity
/**
 * Access : logged in user
 */

module.exports.updateCart = asyncHandler(async (req, res, next) => {
	let productId = req.params.productId,
		userId = req.userData.id;
	let cartData = await crudOPs.getData("carts", 0, { userId });
	let quantity = req.query.quantity || 1;

	//checks if product is in cart
	let isProductInCart = cartData[0].products.find(
		(cartItem) => cartItem.productId == productId
	);
	if (!isProductInCart) {
		return res
			.status(200)
			.send({ success: false, message: "Product Is Not In Cart!!" });
	}

	if (!inStock(productId, quantity)) {
		return res
			.status(200)
			.send({ success: false, message: "Not Enough Quantity Available!!" });
	}

	//update cart
	await cartModel.updateOne(
		{
			_id: cartData[0]._id,
			"products.productId": productId,
		},
		{
			"products.$.quantity": quantity,
		}
	);

	//decrease quantity
	await crudOPs.updateData("products", productId, {
		$inc: { quantity: -quantity },
	});
	res.status(200).send({ success: false, message: "Quantity Updated!!" });
});

/**
 * Access : logged in user
 */

module.exports.deleteItem = asyncHandler(async (req, res, next) => {
	let productId = req.params.productId,
		userId = req.userData.id;
	let cartData = await crudOPs.getData("carts", 0, { userId });
	let return_flag = 1;
	let productQuantityInCart = 0;

	//if product already exists in cart
	cartData[0].products.forEach((productsDet) => {
		if (productsDet.productId == productId) {
			return_flag = 0;
			productQuantityInCart = productsDet.quantity;
		}
	});

	if (return_flag) {
		return res
			.status(400)
			.send({ success: false, message: `No Product Of Id ${productId}!` });
	}

	let product_data = await crudOPs.getData("products", productId);

	// console.log(product_data)

	await crudOPs.updateData("carts", cartData[0]._id, {
		$pull: { products: { productId } },
	});
	await crudOPs.updateData("products", productId, {
		quantity: productQuantityInCart + product_data.quantity,
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
