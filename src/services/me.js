const asyncHandler = require("../api/middlewares/asyncHandler");
const crudOPs = require("../models");

module.exports.getMe = asyncHandler(async (req, res) => {
	let id = req.userData.id;
	let data = await crudOPs.getData("users", id);
	return res.send({ success: true, data });
});

module.exports.updateMe = asyncHandler(async (req, res) => {
	let id = req.userData._id;
	let reqData = { ...req.body };
	let data = await crudOPs.updateData("users", id, reqData);
	return res.send({ success: true, data });
});
