const multer = require("multer");
const storage = multer.diskStorage({

    destination:function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename:function (req, file, cb) {
        cb(null, file.originalname)
    }

})

function fileFilter(req, file, cb) {
    
    let allowed_types = ["jpg", "jpeg", "png", "webp"]
    if (allowed_types.includes(file.mimetype)) {
        return cb(null, true)
    }else{
        cb("Upload Error Images Only!!!", false)
    }

}


const uploadFile = (fieldName) =>{
    return multer({
        storage:storage,
        limits: 1000 * 1000 * 3,
        fileFilter:fileFilter
    }).single(fieldName)
}

module.exports = uploadFile