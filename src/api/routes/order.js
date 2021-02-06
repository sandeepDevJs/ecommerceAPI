const { Router } = require("express");
const {
	addToOrder,
	getOrderById,
	updateOrderToPaid,
	getAllOders,
	getAllOdersByUserId,
	getAllOdersByAdmin,
	updateOrderToDelivered,
} = require("../../services/orders");
const { addToOrderValidator } = require("../middlewares/validators");
const { auth, authAdmin } = require("../middlewares/auth");
const { celebrate } = require("celebrate");

const router = Router();

router.route("/").post(auth, celebrate(addToOrderValidator), addToOrder);

router.route("/").get(auth, authAdmin, getAllOdersByAdmin);
router.route("/:userId/orders").get(auth, authAdmin, getAllOdersByUserId);

router.route("/myorders").get(auth, getAllOders);

router.route("/:orderId/pay").put(auth, updateOrderToPaid);
router
	.route("/:orderId/delivered")
	.put(auth, authAdmin, updateOrderToDelivered);

router.route("/:id").get(auth, getOrderById);

module.exports = router;
