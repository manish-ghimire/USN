const router = require("express").Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const verify = require("./verify");
// create post http://localhost:5000/api/post/{post id}
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
// find comments
// http://localhost:5000/api/post/:id/comments
router.get("/:id/comments", verify, async (req, res) => {
  const com = await Comment.find({commentToId: req.params.id});
  console.log(com);
  res.status(200).json(com);
});
// http://localhost:5000/api/:id/:comments
router.post("/:id/comments", verify, async (req, res) => {
  const newCom = new Comment({
    userId: req.user.id,
    desc: req.body.desc,
    commentToId: req.params.id
  });
  try {
    if (!newCom || req.body.desc.trim() != ''){
    res.status(422).json({error: "Post is Empty"});
  }
  else{
    const savedCom = await newCom.save();
    res.status(200).json(savedCom);
  }
  }
  catch (err) {
    res.status(500).json(err);
  }
});
// delete comments
// http://localhost:5000/api/post/:id/comments
router.delete("/:id/:commentsId", verify, async (req, res) => {
  try {
    const com = await Comment.findById(req.params.commentsId);
    if (com.userId === req.user.id || req.user.isAdmin){
       com.delete();
      res.status(200).json("The post has been deleted!");
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/:id/:commentsId/like", verify, async (req, res) => {
  try {
    const com = await Comment.findById(req.params.commentsId);
    console.log(com);
    if (!com.likes.includes(req.user.id)) {
      await com.updateOne({ $push: { likes: req.user.id } });
      res.status(200).json("The post has been liked");
    } else {
      await com.updateOne({ $pull: { likes: req.user.id } });
      res.status(200).json("The post has been unliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// http://localhost:5000/api/post/:id/:commentsId
router.put("/:id/:commentsId", verify, async (req, res) => {
  const com = await Comment.findOne({_id: req.params.commentsId});
  if (com.userId === req.user.id || req.user.isAdmin){
        if (req.body.desc.trim() != ''){
          try{
            const updatedCom = await Comment.findByIdAndUpdate(
              req.params.commentsId,
              {
                $set: req.body,
              },
              { new: true }
            );      console.log(updatedCom);
                  res.status(200).json(updatedCom);
          }
          catch (err){
            res.status(500).json(err);
          }

}
else {
 res.status(403).json("Post descripton is empty!");
}
  }  else {
        res.status(403).json("You can only update your own comment!");
    }

});
//update a post
// http://localhost:5000/api/post/:id
router.put("/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId === req.user.id || req.user.isAdmin) {
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
      res.status(403).json("You can only update your own post!");
  }

  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post
// http://localhost:5000/api/post/:id
router.delete("/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
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
// http://localhost:5000/api/post/:id/like
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

//Get All Post
// http://localhost:5000/api/post/?user=:id&?role=:role
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
else if (clubPosts){
  posts = await Post.find({postTo: {
    $in: [clubPosts],
  },
});
res.status(200).json(posts);
}
else{
  posts = await Post.find();
  res.status(200).json(posts);
}
});
//Get all post

router.get("/", verify, async (req, res) => {
  posts = await Post.find();
  res.status(200).json(posts);
});
//Get a post
router.get("/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
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
