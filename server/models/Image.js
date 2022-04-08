const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let imageSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    files: {
      type: Array,
    },
    thumbnails: {
      type: Array,
    },
  },
  {
    collection: "images",
  }
);
module.exports = mongoose.model("Image", imageSchema);
