/**
 *
 * This File Holds all services related to users
 *
 * these functions are imported into users routes
 * =====================================================
 * PATH: api/users/
 *
 */

const asyncHandler = require("../api/middlewares/asyncHandler");
const crudOPs = require("../models");
const userModel = require("../models/users.schema");
const { generateToken } = require("../utils/jwt");

module.exports.getUsers = asyncHandler(async (req, res) => {
	let data = await userModel.find();
	res.status(200).send({ success: true, data });
});

module.exports.getUserById = asyncHandler(async (req, res) => {
	let id = req.params.id,
		data;
	data = await crudOPs.getData("users", id);
	return res.send({ success: true, data });
});

module.exports.createUser = asyncHandler(async (req, res) => {
	let reqData = { ...req.body },
		uData,
		token;
	uData = await crudOPs.createData("users", reqData);
	token = generateToken(uData._doc);
	let data = {
		...uData._doc,
		token,
	};
	res.status(201).send({ success: 1, message: "User Created!", data });
});

module.exports.deleteUser = asyncHandler(async (req, res) => {
	let id = req.params.id;
	let data = await crudOPs.deleteData("users", id);
	return res.send({ success: true, data });
});

module.exports.updateUser = asyncHandler(async (req, res) => {
	let id = req.params.id,
		reqData = { ...req.body },
		data;
	data = await crudOPs.updateData("users", id, reqData);
	return res.send({ success: true, data_modified: data });
});
