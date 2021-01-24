const crudOPs = require("../models/index");
const asyncHandler = require("../api/middlewares/asyncHandler");

module.exports.addToOrder = asyncHandler(async (req, res) => {
	let userId = req.userData.userId;

	let cartData = await crudOPs.getData("carts", null, { userId })[0];
	let orderDetails = { ...req.body };

	let orderData = {
		userId,
		products: cartData.products,
		total: cartData.total,
		shippingAddress: cartDetails.shippingAddress,
		paymentMethod: cartDetails.paymentMethod,
	};

	await crudOPs.deleteData("carts", cartData._id);
	let data = await crudOPs.createData("orders", orderData);

	res.status(201).send({ message: "Order Placed!!", data });
});
