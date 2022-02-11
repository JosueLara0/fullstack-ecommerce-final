// Libraries
const multer = require("multer");
// const path = require("path");

// Utils
const { AppError } = require("./appError");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const destPath = path.join(__dirname, "..", "imgs");
//     cb(null, destPath);
//   },
//   filename: (req, file, cb) => {
//     const [filename, extension] = file.originalname.split(".");

//     const newFileName = `${filename}-${Date.now()}.${extension}`;

//     cb(null, newFileName);
//   },
// });

const multerStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    return cb(new AppError("Invalid file", 400), false);
  }

  cb(null, true);
};

const multerUpload = multer({ storage: multerStorage, fileFilter });

module.exports = { multerUpload };
