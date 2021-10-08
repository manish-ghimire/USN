const mongoose = require('mongoose')

const ClubSchema = new mongoose.Schema(
  {
    clubName: {
      type: String,
      required: true,
    },
    clubDisplayName: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      max: 255,
    },
    clubAdmin: {
      type: Array,
      default: [],
    },
    clubMembers: {
      type: Array,
      default: [],
    },
    clubToUni: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Club', ClubSchema)
