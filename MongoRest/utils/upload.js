const multer = require("multer");
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/my-images");
  },
  filename: function (req, file, callback) {
    const filename = getRandomInt(0, 1000) + file.originalname;
    callback(null, filename);
    req.body.image = "http://localhost:3001/static/my-images/" + filename;
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};
const upload = multer({ fileFilter, storage });

module.exports = upload;
