const mongoose = require('mongoose')

const UniSchema = new mongoose.Schema(
  {
    uniName: {
      type: String,
      required: true,
      unique: true,
    },
    uniDisplayName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      max: 255,
      required: true,
      unique: true,
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
    followings: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      max: 255,
    },
    uniAdmin: {
      type: Array,
      default: [],
    },
    clubs: {
      type: Array,
      default: [],
    },
    facultyId: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Uni', UniSchema)
