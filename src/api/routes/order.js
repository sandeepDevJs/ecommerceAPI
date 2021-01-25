const { Router } = require("express");
const {
	addToOrder,
	getOrder,
	updateOrderToPaid,
} = require("../../services/orders");
const { addToOrderValidator } = require("../middlewares/validators");
const { auth } = require("../middlewares/auth");
const { celebrate } = require("celebrate");

const router = Router();

router
	.route("/")
	.get(auth, getOrder)
	.post(auth, celebrate(addToOrderValidator), addToOrder);

router.route("/pay").put(auth, updateOrderToPaid);

module.exports = router;
