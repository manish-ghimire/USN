const mongoose = require("mongoose");

const StudySchema = new mongoose.Schema({
  studyName:{
    type: String,
    require: true,
    unique: true,
  },
  studyDisplayName:{
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
    required: true,
      unique: true,
  },
  studyMembers: {
    type: Array,
    default: [],
        unique: true,
  },
},
{ timestamps: true });

module.exports = mongoose.model("Study", StudySchema);
