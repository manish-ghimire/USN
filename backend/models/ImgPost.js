const mongoose = require('mongoose')

const ImgPostSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
    },
    imgName: {
      type: String,
    },
    userId: {
      type: String,
    },
    timestamp: {
      type: String,
    },
  },
)

module.exports = mongoose.model('ImgPost', ImgPostSchema)
