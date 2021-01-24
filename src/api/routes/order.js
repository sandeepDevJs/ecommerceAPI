const { Router } = require("express");
const { addToOrder } = require("../../services/orders");
const { addToOrderValidator } = require("../middlewares/validators");
const { auth } = require("../middlewares/auth");
const { celebrate } = require("celebrate");

const router = Router();

router.route("/").post(auth, celebrate(addToOrderValidator), addToOrder);

module.exports = router;
