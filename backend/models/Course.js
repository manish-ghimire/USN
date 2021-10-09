const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      unique: true,
    },
    courseDisplayName: {
      type: String,
      unique: true,
    },
    followers: {
      type: Array,
      default: [],
    },
    courseDesc: {
      type: String,
      max: 255,
    },
    courseFees: {
      type: String,
      max: 255,
    },
    courseCode: {
      type: String,
      max: 255,
    },
    courseVersion: {
      type: String,
      max: 255,
    },
    courseDuration: {
      type: String,
      max: 255,
    },
    facultyId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Course', CourseSchema)
