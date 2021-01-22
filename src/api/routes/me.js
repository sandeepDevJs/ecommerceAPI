const { Router } = require("express");
const { celebrate } = require("celebrate");
const { getMe, updateMe } = require("../../services/me");
const { auth } = require("../middlewares/auth");
const { updateValidator } = require("../middlewares/validators");

const router = Router();

router
	.route("/")
	.get(auth, getMe)
	.put(auth, celebrate(updateValidator), updateMe);

module.exports = router;
