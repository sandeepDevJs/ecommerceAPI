/**
 *
 * This File Holds all services related to products
 *
 * these functions are imported into product routes
 * ==================================================
 * PATH: api/products
 *
 */

const asyncHandler = require("../api/middlewares/asyncHandler");
const crudOPs = require("../models");
const paginator = require("../utils/paginator");
const config = require("../config");

/*
    Paginator will paginate if any, sorting, selection & limitation provided in req.query
    it will handle all

    Eg:-
    Get: Products?category=tech&subcategory=watch&limit=10

 */
module.exports.getProducts = asyncHandler(async (req, res) => {
	let { pagination, data } = await paginator("products", req.query);
	res.status(200).send({ success: true, pagination, data });
});

/**
 * @desc {
 *
 * 		Get The Latest Top 3 Products
 * 		Ranked By Rating
 *
 * }
 *
 */
module.exports.getTopProducts = asyncHandler(async (req, res) => {
	let options = {
		limit: 3,
		sort: "-avgRating",
	};
	let { data } = await paginator("products", options);
	res.status(200).send({ success: true, data });
});

/**
 * POST: products/
 *
 * access: Admin
 */

module.exports.createProduct = asyncHandler(async (req, res) => {
	let requestedData = { ...req.body };
	let data = undefined;

	let dataToBeSaved = {
		product_image: config.homeURL + "images/" + req.file.filename,
		title: requestedData.title,
		description: requestedData.description,
		category: requestedData.category,
		subcategory: requestedData.subcategory,
		manufacture_details: {
			model_number: requestedData.model_number,
			release_date: requestedData.release_date,
		},
		quantity: requestedData.quantity,
		pricing: {
			price: requestedData.price,
		},
	};
	data = await crudOPs.createData("products", dataToBeSaved);
	res.status(201).send({ success: 1, message: "Product Created", data: data });
});

/**
 * DELETE: products/
 *
 * access: Admin
 */

module.exports.deleteProduct = asyncHandler(async (req, res) => {
	let product_id = req.params.id;
	await crudOPs.deleteData("products", product_id);
	return res.send({ success: true, message: "Data Deleted!!" });
});

module.exports.updateProduct = asyncHandler(async (req, res) => {
	let data,
		product_id = req.params.id,
		requestedData = { ...req.body };

	if (requestedData.category) {
		await crudOPs.getData("categories", requestedData.category);
		// requestedData.category = category.category;
	}

	console.log(requestedData);

	if (requestedData.subcategory) {
		await crudOPs.getData("subcategories", requestedData.subcategory);
		// requestedData.subcategory = subcategory.subcategory;
	}

	data = await crudOPs.updateData("products", product_id, requestedData);
	return res.send({ success: true, data_modified: data });
});

/**
 * POST: products/
 *
 * access: public
 */

module.exports.getProductById = asyncHandler(async (req, res) => {
	let data;
	let product_id = req.params.id;
	data = await crudOPs.getData("products", product_id);
	res.status(200).send({ success: true, data });
});
