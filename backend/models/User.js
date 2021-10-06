const mongoose = require("mongoose");
const childUserSchema = new mongoose.Schema({
  uniId: {
    type: String,
    default: "",
  },
  classOf: {
    type: String,
    default: "",
  },
});
const childUniUserSchema = new mongoose.Schema({
  studyAt: [childUserSchema],
});

const UserSchema = new mongoose.Schema({
  username:{
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  fName: {
    type: String,
    default: "",
  },
  lName: {
    type: String,
    default: "",
  },
  isAdmin:{
    type: Boolean,
    default: false,
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
    default: ["general"],
  },
  desc: {
    type: String,
    default: "",
  },
  currentCity: {
    type: String,
    default: "",
  },
  isFrom: {
    type: String,
    default: "",
  },
  study: [childUniUserSchema],
},
{ timestamps: true });


module.exports = mongoose.model("User", UserSchema);
