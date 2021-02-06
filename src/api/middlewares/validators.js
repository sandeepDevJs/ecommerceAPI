/**
 *
 * Contains All Sorts of Validations for celebrate
 *
 */

const { Joi } = require("celebrate");
const mongoose = require("mongoose");

(module.exports.signUpValidator = {
	body: Joi.object({
		name: Joi.string().min(4).max(15).trim().required(),
		email: Joi.string().email().max(50).min(8).trim().required(),
		password: Joi.string().max(12).min(5).trim().required(),
		address: Joi.string().min(8).max(30).trim().required(),
		isAdmin: Joi.boolean(),
	}),
}),
	(module.exports.loginValidator = {
		body: Joi.object({
			email: Joi.string().email().max(50).min(8).trim().required(),
			password: Joi.string().max(12).min(5).trim().required(),
		}),
	});

module.exports.updateValidator = {
	body: Joi.object({
		name: Joi.string().max(20).min(4).trim(),
		email: Joi.string().email().max(50).min(8).trim(),
		address: Joi.string().max(30).min(6).trim(),
	}),
};

module.exports.createProductValidator = {
	body: Joi.object({
		title: Joi.string().min(4).max(200).trim().required(),
		description: Joi.string().min(10).max(500).trim().required(),
		category: mongoose.Types.ObjectId,
		subcategory: mongoose.Types.ObjectId,
		model_number: Joi.string().alphanum().required(),
		release_date: Joi.date().required(),
		quantity: Joi.number().min(1).max(50).required(),
		price: Joi.number().min(100).max(200000).required(),
	}),
};

module.exports.categoryValidator = {
	body: Joi.object({
		category: Joi.string().min(3).max(16).required(),
	}),
};

module.exports.subcategoryValidator = {
	body: Joi.object({
		subcategory: Joi.string().min(3).max(16).required(),
		category_id: mongoose.Types.ObjectId,
		category_id: Joi.required(),
	}),
};

module.exports.updateSubcategoryValidator = {
	body: Joi.object({
		subcategory: Joi.string().min(3).max(16),
		category_id: mongoose.Types.ObjectId,
	}),
};

module.exports.emailValidator = {
	body: Joi.object({
		email: Joi.string().email().max(50).min(8).trim().required(),
	}),
};

module.exports.passwordValidator = {
	body: Joi.object({
		password: Joi.string().max(12).min(5).trim().required(),
	}),
};

module.exports.reviewValidator = {
	body: Joi.object({
		text: Joi.string().min(10).max(500).trim().required(),
		rating: Joi.number().min(1).max(5).required(),
	}),
};

module.exports.updateReviewValidator = {
	body: Joi.object({
		text: Joi.string().min(5).max(500).trim(),
		rating: Joi.number().min(1).max(5),
	}),
};

module.exports.addToOrderValidator = {
	body: Joi.object({
		shippingAddress: {
			address: Joi.string().required(),
			city: Joi.string().required(),
			postalCode: Joi.number().required(),
			country: Joi.string().required(),
		},

		paymentMethod: Joi.string().valid("PayPal").required(),

		totalPrice: Joi.number().required(),
		shippingPrice: Joi.number().required(),
		taxPrice: Joi.number().required(),
	}),
};
