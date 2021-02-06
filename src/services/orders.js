const crudOPs = require("../models/index");
const asyncHandler = require("../api/middlewares/asyncHandler");
const orderModel = require("../models/order.schema");
const ErrorResponse = require("../utils/errorResponse");

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

module.exports.getOrderById = asyncHandler(async (req, res) => {
	let orderId = req.params.id;

	let data = await orderModel
		.findById(orderId)
		.populate({ path: "products.productId userId", select: "-__v" });

	res.status(201).send({ message: "Order Placed!!", data });
});

module.exports.updateOrderToPaid = asyncHandler(async (req, res) => {
	let orderId = req.params.orderId;

	let data = await orderModel.findById(orderId);
	data.isPaid = true;
	data.paidAt = Date.now();

	const updateOrder = await data.save();
	res.status(200).send({ message: "Order paid!", data });
});

module.exports.getAllOders = asyncHandler(async (req, res) => {
	let userId = req.userData.id;
	let data = await orderModel.find({ userId });
	res.status(200).send({ data });
});

module.exports.getAllOdersByUserId = asyncHandler(async (req, res, next) => {
	let userId = req.params.userId;
	let data = await orderModel.find({ userId }).populate({ path: "userId" });
	if (!data.length) {
		next(new ErrorResponse("No Data!", 404));
	} else {
		res.status(200).send({ data });
	}
});

module.exports.getAllOdersByAdmin = asyncHandler(async (req, res) => {
	let data = await orderModel.find();
	res.status(200).send({ data });
});

module.exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
	let orderId = req.params.orderId;

	let data = await orderModel.findById(orderId);
	data.isDelivered = true;
	data.deliveredAt = Date.now();

	const updateOrder = await data.save();
	res.status(200).send({ message: "Order paid!", data });
});
