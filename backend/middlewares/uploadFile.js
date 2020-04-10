const multer = require('multer');
const uuid = require('uuid/v1');

const MIME_TYPES = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
};

const uploadFile = multer({
  limits: 500000, // in bytes
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images'); // First argument is errors
    },
    filename: (req, file, cb) => {
      const extension = MIME_TYPES[file.mimetype];
      cb(null, `${uuid()}.${extension}`); // First argument is errors
    },
    fileFilter: (req, file, cb) => {
      // Only accept image files
      const isValid = !!MIME_TYPES[file.mimetype]; // Double exclamation mark to return Boolean
      const error = isValid ? null : new Error('Invalid mime type!');
      cb(error, isValid);
    },
  }),
});

module.exports = uploadFile;
