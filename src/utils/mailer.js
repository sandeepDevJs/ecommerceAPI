const nodemailer = require("nodemailer");
const config = require("../config");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(options) {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: config.smtp_host,
		port: config.smtp_port,
		secure: false, // true for 465, false for other ports
		auth: {
			user: config.smtp_email, // generated ethereal user
			pass: config.smtp_password, // generated ethereal password
		},
	});

	let message = {
		from: `${config.from_name} <@${config.from_email}>`, // sender address
		to: options.email, // list of receivers
		subject: options.subject, // Subject line
		html: options.message,
	};

	const info = await transporter.sendMail(message);
}

module.exports = sendEmail;
