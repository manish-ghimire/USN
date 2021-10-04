const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
{
  userId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    max: 500,
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
    type: Array,
    default : [],
    required: true,
  }

},
{ timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);
