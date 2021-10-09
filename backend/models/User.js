const mongoose = require('mongoose')

const UniDetailSchema = new mongoose.Schema({
  uniId: {
    type: String,
    default: '',
  },
  classOf: {
    type: String,
    default: '',
  },
})

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    fName: {
      type: String,
      default: '',
    },
    lName: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
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
      default: ['general'],
    },
    desc: {
      type: String,
      default: '',
    },
    currentCity: {
      type: String,
      default: '',
    },
    isFrom: {
      type: String,
      default: '',
    },
    clubs: {
      type: Array,
      default: [],
    },
    studyGroups: {
      type: Array,
      default: [],
    },
    study: [UniDetailSchema],
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
