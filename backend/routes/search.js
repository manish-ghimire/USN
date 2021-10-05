const router = require("express").Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const verify = require("./verify");
// create post http://localhost:5000/api/post/{post id}
// http://localhost:5000/api/post/

// });
//Get All Post
// http://localhost:5000/api/post/?user=:id&?=role=:role
router.post("/", verify, async (req, res) => {
  console.log(req.body.searchTerm);
const searchPost = await Post.find({ desc : req.body.searchTerm })

const searchUsername = await User.find({username: req.body.searchTerm});
// console.log({searchUsername}, {"searchPost":searchPost});
if (searchUsername){

      

}else{
  return res.status(422).json('No users found!')
}
});


module.exports = router;
