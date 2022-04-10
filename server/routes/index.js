let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  jimp = require("jimp");
router = express.Router();

const DIR = "./public/images";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

//generate thumbnail
const generate = async (req, res, next) => {
  for (var i = 0; i < req.files.length; i++) {
    const fileName = req.files[i].originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    jimp.read(req.files[i].path, (err, image) => {
      if (err) throw err;
      image
        .resize(200, 200)
        .quality(60)
        .write("public/thumbnails/" + fileName);
    });
  }
  next();
};

// User model
let Image = require("../models/Image");
router.post(
  "/file-upload",
  upload.array("files", 10),
  generate,
  (req, res, next) => {
    const reqFiles = [];
    const reqThumbnails = [];
    const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/public/images/" + req.files[i].filename);
      reqThumbnails.push(url + "/public/thumbnails/" + req.files[i].filename);
    }

    const image = new Image({
      _id: new mongoose.Types.ObjectId(),
      files: reqFiles,
      thumbnails: reqThumbnails,
    });
    image
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "Done upload!",
          userCreated: {
            _id: result._id,
            files: result.files,
            thumbnails: result.thumbnails,
          },
        });
      })
      .catch((err) => {
        console.log(err),
          res.status(500).json({
            error: err,
          });
      });
  }
);
router.get("/", (req, res, next) => {
  Image.find().then((data) => {
    res.status(200).json({
      message: "Data fetched!",
      images: data,
    });
  });
});
module.exports = router;
