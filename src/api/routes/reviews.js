const { Router } = require("express");
const { celebrate } = require("celebrate");
const { auth, authAdmin } = require("../middlewares/auth");
const { reviewValidator } = require("../middlewares/validators");
const {
	getReviewById,
	getReviews,
	getReviewsByProductId,
	addReview,
} = require("../../services/review");
const router = Router();

router.route("/").get(getReviews);

router.route("/:id").get(getReviewById);
router
	.route("/product/:id")
	.get(getReviewsByProductId)
	.post(auth, celebrate(reviewValidator), addReview);

module.exports = router;
