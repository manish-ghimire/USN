const router = require("express").Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const verify = require("./verify");
// TEST ONLY TEST ONLY
// TEST ONLY TEST ONLY
// TEST ONLY TEST ONLY
// TEST ONLY TEST ONLY
// TEST ONLY TEST ONLY
// TEST ONLY TEST ONLY
// comment in posts.js
//  post http://localhost:5000/api/comment/:postId
// http://localhost:5000/api/comment/:postId
router.post("/:postId", verify, async (req, res) => {
  const newCom = new Comment({
    userId: req.user.id,
    desc: req.body.desc,
    commentToId: req.params.postId
  });
  try {
    if (!newCom){
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

module.exports = router;
