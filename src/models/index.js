/**
 * This Files Holds All CRUD functions with models
 */

const ProductsModel = require("./products.schema");
const CategoriesModel = require("./category.schema");
const SubcategoriesModel = require("./subcategory.schema");
const usersModel = require("./users.schema");
const carts = require("./cart.schema");
const RevirewModel = require("./review.schema");
const ErrorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");

/**
 * @param  {String} modelName
 * @description Takes name of the model and returns Model
 */
function getModel(modelName) {
	switch (modelName) {
		case "products":
			return ProductsModel;

		case "categories":
			return CategoriesModel;

		case "subcategories":
			return SubcategoriesModel;

		case "users":
			return usersModel;

		case "carts":
			return carts;

		case "reviews":
			return RevirewModel;

		default:
			return false;
	}
}

/**
 * @param  {String} Model
 * @param  {mongoose.Types._ObjectId} id
 * @param  {Object} filters={}
 * @param  {String} select=""
 *
 * @desc    returns Data based on model &
 *          filters & selector fields
 *
 */
module.exports.getData = async (Model, id, filters = {}, select = "") => {
	let query, data;

	//get the model
	Model = getModel(Model);

	//if model name is invalid then throw an error
	if (!Model) throw new ErrorResponse("Internal error!!", 500);

	//search by id.
	if (id) {
		query = Model.findById(id);
	} else {
		query = Model.find(filters); //else search by filters, if filters are not given it will return all data.
	}
	// execute query.
	data = await query.select(select);
	//if no data found then throw an error
	if (!data) {
		throw new ErrorResponse(`No Data Found Associated To ${id}`, 400);
	} else if (data.length === 0) {
		let filterFields = Object.keys(filters);
		throw new ErrorResponse(
			`No Data Found Associated To ${filterFields} !`,
			400
		);
	}
	return data;
};

/**
 * @param  {String} ModelName
 * @param  {mongoose.Types.ObjectId} id
 *
 * @desc    Deletes data by id
 *
 */
module.exports.deleteData = async (ModelName, id) => {
	let data, Model;

	//get the model
	Model = getModel(ModelName);
	//if model name is invalid then throw an error
	if (!Model) throw new ErrorResponse("Internal error!!", 500);

	//if model name is invalid then throw an error
	if (!id)
		throw new ErrorResponse("We Need Id As A Parameter To Delete Data.", 400);

	//if no data found then it will throw an error
	data = await this.getData(ModelName, id);

	//delete data
	await data.remove();
	return true;
};

/**
 * @param  {String} ModelName
 * @param  {Object} anyData
 */
module.exports.createData = async (ModelName, anyData) => {
	let data, Model;
	Model = getModel(ModelName);
	//if model name is invalid then throw an error
	if (!Model) throw new ErrorResponse("Internal error!!", 500);

	data = await new Model(anyData).save();
	return data;
};

/**
 * @param  {String} ModelName
 * @param  {mongoose.Types.ObjectId} id
 * @param  {Object} anyData
 */
module.exports.updateData = async (ModelName, id, anyData) => {
	let data, Model;
	Model = getModel(ModelName);
	//if model name is invalid then throw an error
	if (!Model) throw new ErrorResponse("Internal error!!", 500);

	//if model name is invalid then throw an error
	if (!id)
		throw new ErrorResponse("We Need Id As A Parameter To update Data.", 400);

	//if no data found then it will throw an error
	data = await this.getData(ModelName, id);

	data = await Model.updateOne({ _id: id }, anyData, {
		new: true,
		runValidators: true,
	});
	return data.nModified;
};

module.exports.getModel = getModel;
