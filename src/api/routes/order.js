const { Router } = require("express");
const {
	addToOrder,
	getOrderById,
	updateOrderToPaid,
	getAllOders,
} = require("../../services/orders");
const { addToOrderValidator } = require("../middlewares/validators");
const { auth } = require("../middlewares/auth");
const { celebrate } = require("celebrate");

const router = Router();

router.route("/").post(auth, celebrate(addToOrderValidator), addToOrder);

router.route("/myorders").get(auth, getAllOders);

router.route("/:orderId/pay").put(auth, updateOrderToPaid);

router.route("/:id").get(auth, getOrderById);

module.exports = router;
