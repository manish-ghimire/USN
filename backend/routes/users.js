const router = require('express').Router()
const User = require('../models/User')
const Uni = require("../models/Uni")
const Study = require("../models/Study")
const Club = require("../models/Club")
const Post = require('../models/Post')
const verify = require('./verify')
const bcrypt = require('bcrypt')

// Get User Via userId or Username
// http://localhost:5000/api/users/:id or username
router.get('/:id', verify, async (req, res) => {

  try {
    const usern = await User.findOne({ username: req.params.id })
    if (!usern) {
      const user = await User.findById(req.params.id)
      try {
        const userClubAdmin = await Club.find({
            clubAdmin: {
              $in: [req.params.id],
          }
        })

        const userClubMembers = await Club.find({
          clubMembers: {
            $in: [req.params.id],
          }
        })

        const userStudyAdmin = await Study.find({
          studyMembers: {
            $in: [req.params.id],
          },
            studyAdmin: {
              $in: [req.params.id],
          }
        })
        const userStudyMembers = await Study.find({
          studyMembers: {
            $in: [req.params.id],
          }
        })
        const { password, updatedAt, ...other } = user._doc
        const userAll = [
          ...other,
          ...userClubAdmin,
          ...userClubMembers,
          ...userStudyAdmin,
          ...userStudyMembers,

        ]
        res.status(200).json(userAll);
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      try {
        const { password, updatedAt, ...other } = usern._doc
        const userAll = [
          ...other,
          ...userClubAdmin,
          ...userClubMembers,
          ...userStudyAdmin,
          ...userStudyMembers,

        ]
        res.status(200).json(userAll);
      } catch (err) {
        res.status(500).json(err)
      }
    }
  } catch (err) {
    return res.status(401).json('Not authenticated!')
  }
})

// get all user via query
router.get("/find", verify, async (req, res) => {
  const role = req.query.role;

  let users;
  console.log(role);
  if (role){
      users = await Post.find({role: {
        $in: [role],
      },
    });
      res.status(200).json(posts);
  }
  });

//Update User
// https://reqbin.com/
// put--> http://localhost:5000/api/users/:id
// {
// "userId":"id",
// update stuff
// }
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
    // try {
      if (req.body.isAdmin === req.user.isAdmin || req.user.isAdmin) {
        const user = await User.findById(req.params.id)

        const { study, ...other } = req.body
      const updatedUser = await user.update({
  $set: other,
  $push: {
      study: req.body.study
  }
}, {
  multi: true
});



        return res.status(200).json("user has been updated");

      } else if (req.body.isAdmin !== req.user.isAdmin) {
        const user = await User.findById(req.params.id)
        const { isAdmin, study, ...other } = req.body
        const updatedUser = await user.update({
    $set: other,
    $push: {
        study: req.body.study
    }
  });

        return res.status(200).json("user has been updated")
      }
    // } catch (err) {
    //   res.status(500).json(err)
    // }
  } else {
    res.status(401).json('Can not update!')
  }
  //  if (reqUser._doc.isAdmin){
  //    try {
  //        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
  //            $set: {isAdmin: req.body.isAdmin},
  //        }, {
  //            new: true
  //        });
  //        res.status(401).json("Can not update!");
  //    } catch (err) {
  //        res.status(500).json(err);
  //    }
  // }
})

// Delete User
router.delete('/:id', verify, async (req, res) => {
  // const reqUser = await User.findById(req.body.userId);
  console.log(req.user.isAdmin)
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const user = await User.findById(req.params.id)
      try {
        //delete all post from user
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

// Get followers
router.get('/:userId/following', verify, async (req, res) => {
      try {
  const user = await User.findById(req.params.userId);
  console.log(user.following);
  const following = await Promise.all(
    user.following.map(
      followingId => {
      console.log(followingId);
      return User.findById(followingId)
  })
);
let followingList = [];
following.map(followingUsers => {
 const { _id, username, profilePicture } = followingUsers;
 followingList.push({ _id, username, profilePicture })
}
);
res.status(200).json(followingList);

    } catch (err) {
      res.status(500).json(err);
    }
});
router.get('/:userId/followers', verify, async (req, res) => {
  try {
const user = await User.findById(req.params.userId);
console.log(user);
const followers = await Promise.all(
user.followers.map(
  followerId => {
  return User.findById(followerId)
})
);
let followerList = [];
followers.map(followerUsers => {

  console.log(followerUsers);
const { _id, username, profilePicture } = followerUsers;
console.log(followerUsers);
followerList.push({ _id, username, profilePicture })
}
);
res.status(200).json(followerList);

} catch (err) {
  res.status(500).json(err);
}
});


//follow
// http://localhost:5000/api/users/:id/follow
router.put("/:id/follow", verify, async (req, res) => {
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
        res.status(200).json('user has been unfollowed');
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json('you cant follow yourself')
  }
})

//unfollow

module.exports = router
