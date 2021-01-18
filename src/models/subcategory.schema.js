let ErrorResponse = require("../utils/errorResponse");
var mongoose = require("mongoose");
var subcategories = new mongoose.Schema({
	subcategory: {
		type: String,
		required: true,
		unique: [true, "subcategory already exists"],
	},
	category_id: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
});

//before saving check for duplicate
subcategories.pre("save", async function (next) {
	let allData = await subcats.find({});
	allData.forEach((data) => {
		if (data.subcategory.toLowerCase() === this.subcategory.toLowerCase()) {
			next(new ErrorResponse("Resourse Already Exist.", 400));
		}
	});
	next();
});

let subcats = mongoose.model("subcategories", subcategories);

module.exports = subcats;
