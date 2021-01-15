const asyncHandler = require("../api/middlewares/asyncHandler");
const crudOPs = require("../models");
const paginator = require("../utils/paginator");

module.exports.getReviewById = asyncHandler(async (req, res) => {
	let review_id = req.params.id;
	let { pagination, data } = await paginator(
		"reviews",
		{ _id: review_id },
		"products"
	);
	res.status(200).send({ success: true, pagination, data });
});

module.exports.getReviews = asyncHandler(async (req, res) => {
	let { pagination, data } = await paginator("reviews", {});
	res.status(200).send({ success: true, pagination, data });
});

module.exports.getReviewsByProductId = asyncHandler(async (req, res) => {
	let product_id = req.params.id;
	let { pagination, data } = await paginator(
		"reviews",
		{ _id: product_id },
		"products"
	);
	res.status(200).send({ success: true, pagination, data });
});

module.exports.addReview = asyncHandler(async (req, res) => {
	let reviewData = { ...req.body };
	let productId = req.params.id;

	reviewData.productId = productId;
	reviewData.user = req.userData.id;

	let data = await crudOPs.createData("reviews", reviewData);
	res.status(200).send({ success: true, data });
});
