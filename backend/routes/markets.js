const router = require('express').Router()
const Market = require('../models/Market')
const User = require('../models/User')
const verify = require('./verify')
const Comment = require('../models/Comment')
// post item comments
router.post('/item/:itemId/comments', verify, async (req, res) => {
  const newCom = new Comment({
    userId: req.user.id,
    desc: req.body.desc,
    commentToId: req.params.itemId,
  })

  // try {
  if (!newCom) {
    res.status(422).json({ error: 'Post is Empty' })
  } else {
    const savedCom = await newCom.save()
    const oneItem = await Market.findById(req.params.itemId)
    if (oneItem) {
      const comToItemUpdate = await oneItem.updateOne({
        $push: { commentId: '' + savedCom._id + '' },
      })
    }
    res.status(200).json(savedCom)
  }
  // }
  // catch (err) {
  //   res.status(500).json(err);
  // }
})
router.get('/item/:itemId/comments', verify, async (req, res) => {
  const com = await Comment.find({ commentToId: req.params.itemId })
  console.log(com)
  res.status(200).json(com)
})
router.post('/item/', verify, async (req, res) => {
  if (!req.body.itemName || !req.body.itemPrice) {
    console.log({
      errors: 'itemName or itemPrice field is required',
    })
    return res.status(422).json({
      error: 'itemName or itemPrice field is required',
    })
  } else {
    const newMark = new Market({
      userId: req.user.id,
      itemName: req.body.itemName,
      itemDesc: req.body.itemDesc,
      itemPrice: req.body.itemPrice,
      itemLocation: req.body.itemLocation,
      img: req.body.img,
      role: req.body.role,
      postToId: req.body.postToId,
    })
    // try {
    if (!newMark) {
      res.status(422).json({ error: 'All fields are required' })
    } else {
      const saveMark = await newMark.save()
      res.status(200).json(saveMark)
    }
  }
  // }
  // catch (err) {
  //   res.status(500).json(err);
  // }
})

router.put('/item/:itemId', verify, async (req, res) => {
  try {
    const post = await Market.findById(req.params.itemId)

    if (post.userId === req.user.id || req.user.isAdmin) {
      try {
        const updatedPost = await Market.findByIdAndUpdate(
          req.params.itemId,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updatedPost)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(403).json('You can update only your post!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/item/:itemId', verify, async (req, res) => {
  try {
    const post = await Market.findById(req.params.itemId)
    if (post.userId === req.user.id || req.user.isAdmin) {
      post.delete()
      // await User.deleteMany({
      //   userId: post._id
      // });
      res.status(200).json('The post has been deleted!')
    } else {
      res.status(401).json('You can delete only your post!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/item/:itemId/like', verify, async (req, res) => {
  try {
    const post = await Market.findById(req.params.itemId)
    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } })
      res.status(200).json('The post has been liked')
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } })
      res.status(200).json('The post has been unliked')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/item/:itemId', verify, async (req, res) => {
  try {
    const post = await Market.findById(req.params.itemId)
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(500).json("can't find item!")
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/', verify, async (req, res) => {
  const items = await Market.find()
  res.status(200).json(items)
})

// extra

router.get('/item', verify, async (req, res) => {
  const role = req.query.role
  const userPosts = req.query.user
  console.log(userPosts)
  let posts
  if (userPosts) {
    posts = await Market.find({ userId: userPosts })
    res.status(200).json(posts)
  } else if (role) {
    posts = await Market.find({
      role: {
        $in: [role],
      },
    })
    res.status(200).json(posts)
  } else {
    res.status(500).json('cant find item')
  }
})

module.exports = router
