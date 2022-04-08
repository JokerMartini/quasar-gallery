let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  sharp = require("sharp");
router = express.Router();
const imageThumbnail = require("image-thumbnail");

const DIR = "./public/images";
const DIRT = "./public/thumbnails";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});
// const Tstorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIRT);
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(" ").join("-");
//     cb(null, fileName);
//   },
// });

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
    // imageThumbnail(req.files[i].path, { width: 50, height: 50 })
    //   .then((thumbnail) => {
    //     upload;
    //     console.log(thumbnail);
    //   })
    //   .catch((err) => console.error(err));

    await sharp(req.files[i].path)
      .resize(200, 200)
      .toFile(
        "public/thumbnails/" +
          req.files[i].originalname.toLowerCase().split(" ").join("-"),
        (err, resizeImage) => {
          if (err) {
            console.log(err);
          } else {
            console.log(resizeImage);
          }
        }
      );
  }
  next();
};

// User model
let User = require("../models/User");
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

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      files: reqFiles,
      thumbnails: reqThumbnails,
    });
    user
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
  User.find().then((data) => {
    res.status(200).json({
      message: "Data fetched!",
      users: data,
    });
  });
});
module.exports = router;
