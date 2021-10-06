const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
  clubName:{
    type: String,
    require: true,
  },
  clubDisplayName:{
    type: String,
    require: true,
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
  clubAdmin: {
    type: Array,
    default: [],
    required: true,
  },
  clubMembers: {
    type: Array,
    default: [],
  },
  clubToUni: {
    type: String,
    require: true,
  }
},
{ timestamps: true });

module.exports = mongoose.model("Club", ClubSchema);
