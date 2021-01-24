/**
 *
 * This File Holds all services related to Authetication
 *
 * these functions are imported into auth routes
 *
 */

const crypto = require("crypto");
const asyncHandler = require("../api/middlewares/asyncHandler");
const crudOPs = require("../models");
const { verify } = require("../utils/encrypter");
const { generateToken } = require("../utils/jwt");
const config = require("../config");
const sendEmail = require("../utils/mailer");
const ErrorResponse = require("../utils/errorResponse");
const { encrypt } = require("../utils/encrypter");

module.exports.loginUser = asyncHandler(async (req, res) => {
	let { email, password } = req.body;
	let userData = await crudOPs.getData("users", 0, { email }, "+password");
	let result = await verify(password, userData[0].password);
	if (result) {
		let token = generateToken(userData[0]);
		let data = {
			_id: userData[0]._id,
			name: userData[0].name,
			email: userData[0].email,
			isAdmin: userData[0].isAdmin,
			token,
		};
		res.send({ success: true, message: "You're logged In", data });
	} else {
		res.status(401).send({ success: false, message: "Invalid Credentials!!" });
	}
});

module.exports.forgotPassword = asyncHandler(async (req, res) => {
	let { email } = req.body;
	let userData = await crudOPs.getData("users", 0, { email });

	//generate reset token
	const resetToken = crypto.randomBytes(20).toString("hex");

	//hash token
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	//set token expiry
	const tokenExpiry = Date.now() + 10 * 60 * 1000;

	// insert token into db
	crudOPs.updateData("users", userData[0]._id, {
		resetPasswordToken,
		tokenExpiry,
	});

	//create url
	const url = config.homeURL + "resetPassword/" + resetToken;

	//set mmessage
	const message =
		"you are receiving this message because you have requested the reset of a password. Please Make A PUT Request To " +
		url;

	try {
		//send email
		await sendEmail({
			email: userData[0].email,
			subject: "Password Reset Token",
			message,
		});
	} catch (error) {
		throw new ErrorResponse("Email Could Not Be Sent", 500);
	}
	res.send({ success: true, message: "Email Sent!!" });
});

//reset token
module.exports.resetPassword = async (req, res, next) => {
	let requestedToken = req.params.token;

	// hash user token
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(requestedToken)
		.digest("hex");

	try {
		//if no data get then it'll throw an error
		let data = await crudOPs.getData("users", 0, {
			resetPasswordToken,
			tokenExpiry: { $gt: Date.now() },
		});
		let dataToBeUpdated = {
			resetPasswordToken : undefined,
			tokenExpiry : undefined,
			password: await encrypt(req.body.password),
		};
		//update data
		await crudOPs.updateData("users", data[0]._id, dataToBeUpdated);
		res.send({ success: true, message: "Password Changed Successfully!!" });
	} catch (error) {
		// console.log(error)
		if (error.statusCode === 400) {
			return next(
				new ErrorResponse(
					"Invalid Token!!, Try hitting forget Password Again.",
					401
				)
			);
		}
		next(new ErrorResponse("An Internal Error Occurred!!!", 500));
	}
};
//11690
