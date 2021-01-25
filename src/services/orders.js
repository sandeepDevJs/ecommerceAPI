const crudOPs = require("../models/index");
const asyncHandler = require("../api/middlewares/asyncHandler");
const orderModel = require("../models/order.schema");

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

	let data = await orderModel
		.findOne({ userId })
		.populate({ path: "products.productId userId", select: "-__v" });

	res.status(201).send({ message: "Order Placed!!", data });
});

module.exports.updateOrderToPaid = asyncHandler(async (req, res) => {
	let userId = req.userData.id;

	let data = await orderModel.findOne({ userId });
	data.isPaid = true;
	data.paidAt = Date.now();

	const updateOrder = await data.save();
	res.status(201).send({ message: "Order paid!", data });
});
