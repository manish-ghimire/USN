const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username:{
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  isAdmin:{
    type: Boolean,
    default: false,
  },
  uniAdmin:{
    type: Array,
    default: [],
  },
  clubAdmin:{
    type: Array,
    default: [],
  },
  studyAdmin:{
    type: Array,
    default: [],
  },
  email: {
    type: String,
    require: true,
    min: 50,
    unique: true,
  },
  password:{
    type: String,
    require: true,
    min: 6,
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
  following: {
    type: Array,
    default: [],
  },
  role: {
    type: Array,
    default: [],
  },
  desc: {
    type: String,
    max: 50,
  },
  currentCity: {
    type: String,
    max: 50,
  },
  isFrom: {
    type: String,
    max: 50,
  },
},
{ timestamps: true });

module.exports = mongoose.model("User", UserSchema);
