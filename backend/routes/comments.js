const router = require("express").Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const verify = require("./verify");
// create post
// post http://localhost:5000/api/post
// {
// "userId": "{userId}",
// "desc": "{post desc}"
// }
// update post
// post http://localhost:5000/api/post/{post id}
// {
// "userId": "6111104d64500e62187a6727",
// "desc": "update post desc"
// }
// get post http://localhost:5000/api/post/{post id}
// http://localhost:5000/api/post/
router.post("/", verify, async (req, res) => {
  const newPost = new Post(req.body);
  try {
    if (!newPost){
    res.status(422).json({error: "Post is Empty"});
  }
  else{
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  }
  }
  catch (err) {
    res.status(500).json(err);
  }
});
//update a post
//http://localhost:5000/api/comment/:postId
router.put("/:postId", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (post.userId === req.user.id) {
      if (req.body.desc.trim() != ''){
      try{
        const updatedPost = await Post.findByIdAndUpdate(
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
    } else {
      res.status(403).json("Post descripton is empty!");
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

router.delete("/:id", verify, (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (post.userId === req.user.id) {
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

router.put("/:id/like", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
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
//Get a post
// router.get("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//Get All Post
// http://localhost:5000/api/post/?user=:id&?=role=:role
router.get("/find", verify, async (req, res) => {
const role = req.query.role;
const userPosts = req.query.user;
const uniPosts = req.query.uni;
const clubPosts = req.query.club;
// try{
console.log(userPosts);
let posts;
if (userPosts){
  posts = await Post.find({userId:userPosts});
  res.status(200).json(posts);
}else if (role){
    posts = await Post.find({role: {
      $in: [role],
    },
  });
    res.status(200).json(posts);
}else if (uniPosts){
  posts = await Post.find({postTo: {
    $in: [uniPosts],
  },
});
res.status(200).json(posts);
}
else{
  res.status(404).json("cant find post");
}
// }
// catch (err){
//     res.status(500).json(err);
// }
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
