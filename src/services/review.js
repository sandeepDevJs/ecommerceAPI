const asyncHandler = require("../api/middlewares/asyncHandler");
const crudOPs = require("../models");
const productsSchema = require("../models/products.schema");
const RevirewModel = require("../models/review.schema");
const ErrorResponse = require("../utils/errorResponse");
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
	let { pagination, data } = await paginator("reviews", {
		user: req.userData.id,
	});
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

	await crudOPs.updateData("products", data.productId, {
		$push: { reviews: data._id },
	});

	res.status(200).send({ success: true, data });
});

module.exports.updateReview = asyncHandler(async (req, res, next) => {
	let reviewData = { ...req.body };
	let reviewId = req.params.id;

	let reviews = await crudOPs.getData("reviews", reviewId);

	if (reviews.user != req.userData.id) {
		next(
			new ErrorResponse(
				"You Are Not Authorized To Make Changes In This Review!",
				401
			)
		);

		return false;
	}

	let data = await crudOPs.updateData("reviews", reviewId, reviewData); //RevirewModel.findByIdAndUpdate(reviewId); //crudOPs.updateData("reviews", reviewId);
	res.status(200).send({ success: true, message: "Changes Made!" });
});

module.exports.deleteReview = asyncHandler(async (req, res, next) => {
	let reviewId = req.params.id;

	let reviews = await crudOPs.getData("reviews", reviewId);

	if (reviews.user != req.userData.id) {
		next(
			new ErrorResponse(
				"You Are Not Authorized To Make Changes In This Review!",
				401
			)
		);

		return false;
	}

	let data = await crudOPs.deleteData("reviews", reviewId);
	let a = await productsSchema.findByIdAndUpdate(reviews.productId, {
		$pull: { reviews: reviewId },
	});
	res.status(200).send({ success: true, data: {} });
});
