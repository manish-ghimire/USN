const mongoose = require("mongoose");

const UniSchema = new mongoose.Schema({
  studyName:{
    type: String,
    require: true,
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
  desc: {
    type: String,
    max: 255,
  },
  studyAdmin: {
    type: Array,
    default: [],
  },
  studyMember: {
    type: Array,
    default: [],
  },
},
{ timestamps: true });

module.exports = mongoose.model("Uni", UniSchema);
