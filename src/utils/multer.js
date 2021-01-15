const multer = require("multer");
var path = require("path");
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./src/uploads");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "_Product" + path.extname(file.originalname));
	},
});

function fileFilter(req, file, cb) {
	let allowed_types = [
		"image/jpg",
		"image/jpeg",
		"image/png",
		"image/webp",
		"jpg",
		"jpeg",
		"png",
		"webp",
	];
	if (allowed_types.includes(file.mimetype)) {
		return cb(null, true);
	} else {
		cb("Upload Error Images Only!!!", false);
	}
}

module.exports = multer({
	storage: storage,
	limits: 1000 * 1000 * 3,
	fileFilter: fileFilter,
});
