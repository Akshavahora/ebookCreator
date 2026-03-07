import multer from "multer";
import path from "path";
import fs from "fs";  // Built-in Node.js module used to work with files and folders

// Create uploads directory if it doesn't exist
import uploadDir from "uploads"
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// set up Storage engine
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb (
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

// check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && ectname) {
        return cb(null, true);
    } else {
        cb("Error: Images Only");
    }
}

// initialize upload
const upload = multer ({
    storage: storage,
    limits: { filesize: 2 * 1024 * 1024 }, //2MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single("coverImage"); //File name for the uploaded file 

export default upload;