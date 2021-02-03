/**
 *
 * This File Holds all services related to Category
 *
 * these functions are imported into category routes
 * =====================================================
 * PATH: api/categories/
 *
 */

const asyncHandler = require("../api/middlewares/asyncHandler");
const crudOPs = require("../models");
const CatModel = require("../models/category.schema");
const paginator = require("../utils/paginator");

/**
   Access : logged in user
 
    Paginator will paginate if any, sorting, selection & limitation provided in req.query
    it will handle all

 */

module.exports.getCategories = asyncHandler(async (req, res, next) => {
	let data = await CatModel.find().populate("subcategories");
	res.status(200).send({ success: true, data });
});

/**
 * Access : Admin
 */

module.exports.createCategory = asyncHandler(async (req, res, next) => {
	let data = await crudOPs.createData("categories", req.body);
	res.status(201).send({ success: true, data: data });
});

/**
 * Access : Admin
 */

module.exports.deleteCategory = asyncHandler(async (req, res) => {
	let id = req.params.id;
	let data = await crudOPs.deleteData("categories", id);
	return res.send({ success: true, data });
});

/**
 * Access : logged in user
 */

module.exports.getCategoryById = asyncHandler(async (req, res) => {
	let id = req.params.id,
		data;
	data = await CatModel.findById(id).populate({ path: "subcategories" });
	return res.send({ success: true, data });
});

/**
 * Access : Admin
 */

module.exports.updateCategory = asyncHandler(async (req, res) => {
	let id = req.params.id,
		reqData = { ...req.body },
		data;
	data = await crudOPs.updateData("categories", id, reqData);
	return res.send({ success: true, data_modified: data });
});
