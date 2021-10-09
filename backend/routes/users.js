const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')
const verify = require('./verify')
const bcrypt = require('bcrypt')

router.get('/:id', verify, async (req, res) => {
  const usern = await User.findOne({ username: req.params.id })
  if (!usern) {
    const user = await User.findById(req.params.id)
    const updatedUser = user._doc
    delete updatedUser.password
    console.log(updatedUser)

    res.status(200).json(updatedUser)
  } else {
    const updatedUser = usern._doc
    delete updatedUser.password
    console.log(updatedUser)

    res.status(200).json(updatedUser)
  }
})

router.get('/', verify, async (req, res) => {
  let users
  users = await User.find()
  res.status(200).json(users)
})

router.put('/:id', verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (err) {
        return res.status(500).json(err)
      }
    }
    if (req.body.isAdmin === req.user.isAdmin || req.user.isAdmin) {
      const user = await User.findById(req.params.id)
      const { study, ...other } = req.body
      if (req.body.study) {
        const updatedUser = await user.update(
          {
            $set: other,
            $push: {
              study: req.body.study,
            },
          },
          {
            multi: true,
          }
        )
      } else {
        const updatedUser = await user.update({
          $set: other,
        })
      }
      return res.status(200).json('user has been updated')
    } else if (req.body.isAdmin !== req.user.isAdmin) {
      const user = await User.findById(req.params.id)
      const { isAdmin, study, ...other } = req.body
      const updatedUser = await user.update({
        $set: other,
        $push: {
          study: req.body.study,
        },
      })

      return res.status(200).json('user has been updated')
    } else if (req.body.isAdmin !== req.user.isAdmin) {
      const user = await User.findById(req.params.id)
      const { isAdmin, study, ...other } = req.body
      const updatedUser = await user.update({
        $set: other,
        $push: {
          study: req.body.study,
        },
      })

      return res.status(200).json('user has been updated')
    }
  } else {
    res.status(401).json('Can not update!')
  }
})

router.delete('/:id', verify, async (req, res) => {
  console.log(req.user.isAdmin)
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const user = await User.findById(req.params.id)
      try {
        await Post.deleteMany({
          username: user.username,
        })
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User deleted!')
      } catch (err) {
        res.status(500).json(err)
      }
    } catch (err) {
      res.status(404).json('User not found')
    }
  } else {
    res.status(401).json('You can not delete!')
  }
})

// ******************************************************

router.put('/:id/follow', verify, async (req, res) => {
  if (req.user.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.user.id)
      if (!user.followers.includes(req.user.id)) {
        await user.updateOne({ $push: { followers: req.user.id } })
        await currentUser.updateOne({ $push: { following: req.params.id } })
        res.status(200).json('user has been followed')
      } else {
        await user.updateOne({ $pull: { followers: req.user.id } })
        await currentUser.updateOne({ $pull: { following: req.params.id } })
        res.status(200).json('user has been unfollowed')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json('you cant follow yourself')
  }
})

module.exports = router
