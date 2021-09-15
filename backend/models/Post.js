const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
{
  username: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    max: 500,
  },
  img: {
    type: String,
  },
  likes: {
    type: Array,
    default: [],
  },
  roles: {
    type: Array,
    default: [],
    required: false,
  },
},
{ timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
