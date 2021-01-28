const asyncHandler = require("../api/middlewares/asyncHandler");
const crudOPs = require("../models");
const userModel = require("../models/users.schema");
const { generateToken } = require("../utils/jwt");

module.exports.getMe = asyncHandler(async (req, res) => {
	let id = req.userData.id;
	let data = await crudOPs.getData("users", id);
	let token = generateToken(data._doc);
	return res.send({ success: true, data: { ...data._doc, token } });
});

module.exports.updateMe = asyncHandler(async (req, res) => {
	let id = req.userData.id;
	let reqData = { ...req.body };
	let data = await userModel.findByIdAndUpdate(id, reqData, {
		new: true,
		runValidators: true,
	});
	let token = generateToken(data._doc);
	return res.send({ success: true, data: { ...data._doc, token } });
});
