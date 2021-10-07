const router = require('express').Router()
const Post = require('../models/Post')
const Market = require('../models/Market')
const Comment = require('../models/Comment')
const User = require('../models/User')
const verify = require('./verify')

//  post http://localhost:5000/api/comment/:postId
// http://localhost:5000/api/comment/:postId
router.post('/', verify, async (req, res) => {
  const newCom = new Comment({
    userId: req.user.id,
    desc: req.body.desc,
    img: req.body.img,
    commentToId: req.body.commentToId,
  })
  try {
    if (!newCom) {
      res.status(422).json({ error: 'Comment is Empty' })
    } else {
      const savedCom = await newCom.save()
      res.status(200).json(savedCom)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', verify, async (req, res) => {
  const com = await Comment.findById(req.params.id)
  if (!com) {
    const com = await Comment.findOne({ commentToId: req.params.id })
    const markCom = await Market.find({ commentId: com })
    res.status(200).json(markCom)
  } else {
    res.status(200).json(com)
  }
})

router.get('/', verify, async (req, res) => {
  const com = await Comment.find()
  res.status(200).json(com)
})

router.put('/:id', verify, async (req, res) => {
  const com = await Comment.findById(req.params.id)
  console.log(com)
  if (req.user.id === com.userId || req.user.isAdmin) {
    const comUpdate = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(comUpdate)
  } else {
    res.status(500).json('you cant not update this comment!')
  }
})
router.delete('/:id', verify, async (req, res) => {
  const com = await Comment.findById(req.params.id)
  // console.log(com);
  if (req.user.id === com.userId || req.user.isAdmin) {
    await Comment.findByIdAndDelete(req.params.id)
    res.status(200).json('comment deleted!')
  } else {
    res.status(500).json('you cant not deleted this comment!')
  }
})
module.exports = router
