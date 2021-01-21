const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const {
	getcart,
	addToCart,
	updateCart,
	deleteItem,
} = require("../../services/cart");

const router = Router();

router.route("/").get(auth, getcart);

router
	.route("/:productId")
	.post(auth, addToCart)
	.put(auth, updateCart)
	.delete(auth, deleteItem);

module.exports = router;
