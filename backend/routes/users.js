const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const verify = require("./verify");
const bcrypt = require("bcrypt");

// Get User Via userId or Username
// http://localhost:5000/api/users/:id or username
router.get("/:id", verify, async (req, res) => {
    // console.log(user);
    try {
        const usern = await User.findOne({username: req.params.id});
        if (!usern){
      const user = await User.findById(req.params.id);
      try {
          const { password, updatedAt, ...other } = user._doc;
          res.status(200).json(other);
      } catch (err) {
          res.status(500).json(err);
      }
        }
        else{
          try {
              const { password, updatedAt, ...other } = usern._doc;
              res.status(200).json(other);
          } catch (err) {
              res.status(500).json(err);
          }
        }
    } catch (err) {
    return res.status(401).json("Not authenticated!")
    }
});

// get user via query
// router.get("/", verify, async (req, res) => {
//     const userId = req.query.userId;
//     const username = req.query.username;
//     try {
//         const user = userId ? await User.findById(userId) : await User.findOne({
//             username: username
//         });
//         const {
//             password,
//             updatedAt,
//             ...other
//         } = user._doc;
//         res.status(200).json(other);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


//Update User
// https://reqbin.com/
// put--> http://localhost:5000/api/users/:id
// {
// "userId":"id",
// update stuff
// }
router.put("/:id", verify, async (req, res) => {

// const reqUser = await User.findById(req.body.userId);
// console.log(reqUser._doc);
// if (reqUser._doc.isAdmin){
//   try {
//       const updatedUser = await User.findByIdAndUpdate(req.params.id, {
//           $set: req.body,
//       }, {
//           new: true
//       });
//       res.status(200).json(updatedUser);
//   } catch (err) {
//       res.status(500).json(err);
//   }
// }
// else if (!reqUser._doc.isAdmin && req.body.userId !== req.params.id || !reqUser._doc.isAdmin && req.body.userId === req.params.id ){
//  try {
//      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
//          $set: {"isAdmin": false},
//      }, {
//          new: true
//      });
//      res.status(401).json("Can not update!!!");
//  } catch (err) {
//      res.status(500).json(err);
//  }
// }
  if (req.user.id === req.params.id || req.user.isAdmin){
        if (req.body.password) {
          try{
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
          }catch (err){
            return res.status(500).json(err);
          }
        }
        try {
                  if (req.body.isAdmin === req.user.isAdmin || req.user.isAdmin){
                        const user = await User.findById(req.params.id);
                    // const updatedAdmin = await uniName.updateOne({ $push: {uniAdmin: req.body.uniAdmin}});
                  const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
                  return res.status(200).json(updatedUser);
                }else if (req.body.isAdmin !== req.user.isAdmin) {
                    const user = await User.findById(req.params.id);
                  const {isAdmin, ...other } = req.body;
                  const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: other}, {new: true});


              return res.status(200).json(updatedUser);
                  }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    else {
       res.status(401).json("Can not update!");
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
});

// Delete User
router.delete("/:id", verify, async (req, res) => {
  // const reqUser = await User.findById(req.body.userId);
  console.log(req.user.isAdmin);
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            const user = await User.findById(req.params.id)
            try {
                //delete all post from user
                await Post.deleteMany({
                    username: user.username
                });
              await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User deleted!");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("User not found")
        }
    } else {
        res.status(401).json("You can not delete!");
    }
});

// Get followers
router.get("/followers/:userId", verify, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const followers = await Promise.all(
      user.following.map((followersId) => {
        return User.findById(followersId);
      })
    );
    let followersList = [];
    followers.map((follower) => {
      const { _id, username, profilePicture } = follower;
      followersList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow
// http://localhost:5000/api/users/:id/follow
router.put("/:id/follow", verify, async (req, res) => {
  if (req.user.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user.id);
      if (!user.followers.includes(req.user.id)) {
        await user.updateOne({ $push: { followers: req.user.id } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});



//unfollow

router.put("/:id/unfollow", verify, async (req, res) => {
  if (req.user.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.user.id);
      if (user.followers.includes(req.user.id)) {
        await user.updateOne({ $pull: { followers: req.user.id } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

module.exports = router;
