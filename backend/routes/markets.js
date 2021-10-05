const router = require("express").Router();
const Market = require("../models/Market");
const User = require("../models/User");
const verify = require("./verify");


router.post("/", verify, async (req, res) => {
  const newMark = new Market({
    userId: req.user.id,
    itemName: req.body.itemName,
    itemDesc: req.body.itemDesc,
    itemPrice: req.body.itemPrice,
    itemLocation: req.body.itemLocation
  });
  try {
    if (!newMark){
    res.status(422).json({error: "All fields are required"});
  }
  else{
    const saveMark = await newMark.save();
    res.status(200).json(saveMark);
  }
  }
  catch (err) {
    res.status(500).json(err);
  }
});
//update a post
// http://localhost:5000/api/market:id
router.put("/item/:id", verify, async (req, res) => {
  try {
    const post = await Market.findById(req.params.id);

    if (post.userId === req.user.id || req.user.isAdmin) {
      try{
        const updatedPost = await Market.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
         res.status(200).json(updatedPost);
      }
      catch (err){
        res.status(500).json(err);
      }
  }
  else {
      res.status(403).json("You can update only your post!");
  }

  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/item/:id", verify, (req, res) => {
  try {
    const post = Market.findById(req.params.id);
    if (post.userId === req.user.id || req.user.isAdmin) {
       post.delete();
      res.status(200).json("The post has been deleted!");
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like / unlike a post

router.put("/item/:id/like", verify, async (req, res) => {
  try {
    const post = await Market.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });
      res.status(200).json("The post has been unliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// router.get("/", verify, async (req, res) => {
//   posts = await Market.find();
//   res.status(200).json(posts);
// });
//Get a post
router.get("/item/:id", verify, async (req, res) => {
  try {
    const post = await Market.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get All Post
// http://localhost:5000/api/post/item?user=:id&?=role=:role
router.get("/item", verify, async (req, res) => {
const role = req.query.role;
const userPosts = req.query.user;
// try{
console.log(userPosts);
let posts;
if (userPosts){
  posts = await Market.find({userId:userPosts});
  res.status(200).json(posts);
}else if (role){
    posts = await Market.find({role: {
      $in: [role],
    },
  });
    res.status(200).json(posts);
}
else{
  post = await Market.find();
  res.status(200).json(posts);
}
// }
// catch (err){
//     res.status(500).json(err);
// }
});

// find comments
// http://localhost:5000/api/post/:id/comments
router.get("/item/:id/comments", verify, async (req, res) => {
  const com = await Comment.find({commentToId: req.params.id});
  console.log(com);
  res.status(200).json(com);
});
// //get timeline posts
//
// router.get("/timeline/:userId", async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.params.userId);
//     const userPosts = await Post.find({ userId: currentUser._id });
//     const followerPosts = await Promise.all(
//       currentUser.followings.map((followerId) => {
//         return Post.find({ userId: followerId });
//       })
//     );
//     res.status(200).json(userPosts.concat(...followerPosts));
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//
// //get all user's posts
//
// router.get("/profile/:username", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.params.username });
//     const posts = await Post.find({ userId: user._id });
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
