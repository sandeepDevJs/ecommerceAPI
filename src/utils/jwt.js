const config = require("../config");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("./errorResponse");

module.exports.generateToken = (data) => {
	return jwt.sign(
		{
			id: data._id,
			email: data.email,
			isAdmin: data.isAdmin,
		},
		config.privateKey /*{ expiresIn:config.keyExp}*/
	);
};

module.exports.verify = (userToken) => {
	try {
		return jwt.verify(userToken, config.privateKey);
	} catch (error) {
		throw new ErrorResponse(error.message, 401);
	}
};
