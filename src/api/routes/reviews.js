const { Router } = require("express");
const { celebrate } = require("celebrate");
const { auth, authAdmin } = require("../middlewares/auth");
const {
	reviewValidator,
	updateReviewValidator,
} = require("../middlewares/validators");
const {
	getReviewById,
	getReviews,
	getReviewsByProductId,
	addReview,
	updateReview,
} = require("../../services/review");
const router = Router();

router.route("/").get(auth, getReviews);

router
	.route("/:id")
	.get(auth, getReviewById)
	.put(auth, celebrate(updateReviewValidator), updateReview);
router
	.route("/product/:id")
	.get(auth, getReviewsByProductId)
	.post(auth, celebrate(reviewValidator), addReview);

module.exports = router;
