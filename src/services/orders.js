const crudOPs = require("../models/index");
const asyncHandler = require("../api/middlewares/asyncHandler");

module.exports.addToOrder = asyncHandler(async (req, res) => {
	let userId = req.userData.id;

	let cartData = await crudOPs.getData("carts", null, { userId });
	let orderDetails = { ...req.body };

	let orderData = {
		userId,
		products: cartData[0].products,
		total: orderDetails.totalPrice,
		shippingAddress: orderDetails.shippingAddress,
		paymentMethod: orderDetails.paymentMethod,
		shippingPrice: orderDetails.shippingPrice,
		taxPrice: orderDetails.taxPrice,
	};

	await crudOPs.deleteData("carts", cartData[0]._id);
	let data = await crudOPs.createData("orders", orderData);

	res.status(201).send({ message: "Order Placed!!", data });
});

module.exports.getOrder = asyncHandler(async (req, res) => {
	let userId = req.userData.id;

	let data = await crudOPs.getData("orders", null, { userId });

	res.status(201).send({ message: "Order Placed!!", data });
});
