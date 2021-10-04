const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
{
  userId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: "",
  },
  likes: {
    type: Array,
    default: [],
  },
  commentToId: {
    type: String,
    required: true,
  }

},
{ timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);
