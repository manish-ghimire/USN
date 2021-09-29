const mongoose = require("mongoose");

const UniSchema = new mongoose.Schema({
  UniName:{
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    min: 50,
    unique: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverPicture: {
    type: String,
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  desc: {
    type: String,
    max: 50,
  },
  uniAdmin: {
    type: Array,
    default: [],
  },
},
{ timestamps: true });

module.exports = mongoose.model("User", UserSchema);
