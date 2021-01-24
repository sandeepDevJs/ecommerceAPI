const { Router } = require("express");
const { addToOrder } = require("../../services/orders");
const { auth } = require("../middlewares/auth");

const router = Router();

router.route("/").post(auth, addToOrder);

module.exports = router;
