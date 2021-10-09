const mongoose = require('mongoose')

const FacultySchema = new mongoose.Schema(
  {
    facultyName: {
      type: String,
      required: true,
      unique: true,
    },
    facultyDisplayName: {
      type: String,
      unique: true,
    },
    followers: {
      type: Array,
      default: [],
    },
    facultyDesc: {
      type: String,
      max: 255,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Faculty', FacultySchema)
