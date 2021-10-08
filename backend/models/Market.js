const mongoose = require('mongoose')

const MarketSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
    },
    itemDesc: {
      type: String,
    },
    itemPrice: {
      type: String,
    },
    itemLocation: {
      type: String,
    },
    img: {
      type: String,
      default: '',
    },
    likes: {
      type: Array,
      default: [],
    },
    role: {
      type: Array,
      default: [],
    },
    postToId: {
      type: Array,
      default: [],
    },
    commentId: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Market', MarketSchema)
