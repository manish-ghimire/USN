const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')
const verify = require('./verify')
const bcrypt = require('bcrypt')

router.get('/:id', verify, async (req, res) => {
  if (verify) {
    const usern = await User.findOne({ username: req.params.id })
    if (!usern) {
      const user = await User.findById(req.params.id)
      if (user._doc) {
        const updatedUser = user._doc
        delete updatedUser.password
        console.log('updatedUser', updatedUser)

        res.status(200).json(updatedUser)
      } else {
        const updatedUser = user
        delete updatedUser.password
        console.log('updatedUser2', updatedUser)
      }
    } else {
      const updatedUser = usern._doc
      delete updatedUser.password
      console.log('updatedUser3', updatedUser)

      res.status(200).json(updatedUser)
    }
  } else {
    res.status(500).json('not login')
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
      if (other) {
        console.log('here')
      }
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
      if (req.body.study) {
        const updatedUser = await user.update({
          $set: other,
          $push: {
            study: req.body.study,
          },
        })
      } else {
        const updatedUser = await user.update({
          $set: other,
        })
      }

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
router.get('/:id/followers', verify, async (req, res) => {
  // try {
  const user = await User.findById(req.user.id)
  const followers = await Promise.all(
    user.followers.map((followerID) => {
      return User.findById(followerID)
    })
  )
  let followerList = []
  followers.map((follower) => {
    const { _id, username, profilePicture } = follower
    followerList.push({ _id, username, profilePicture })
  })
  res.status(200).json(followerList)
  // } catch (err) {
  //   res.status(500).json(err);
  // }
})

router.get('/:id/followings', verify, async (req, res) => {
  // try {
  const user = await User.findById(req.user.id)
  const following = await Promise.all(
    user.following.map((followingID) => {
      return User.findById(followingID)
    })
  )
  let followingList = []
  following.map((following) => {
    const { _id, username, profilePicture } = following
    followingList.push({ _id, username, profilePicture })
  })
  res.status(200).json(followingList)
  // } catch (err) {
  //   res.status(500).json(err);
  // }
})

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
