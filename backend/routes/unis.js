const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const verify = require("./verify");
const bcrypt = require("bcrypt");
// Get User
// router.get("/:id", verify, (req, res) => {
//   if (req.body.userId === req.params.id) {
//           const user = User.findById(req.params.id);
//     try {
//       res.status(200).json(user);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(401).json("Not authenticated!");
//   }
// });

router.get("/", verify, (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId ?  User.findById(userId) : User.findOne({ username: username });
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update User
// https://reqbin.com/
// post--> http://localhost:5000/api/users/:id
router.put("/:id", verify, (req, res) => {
  if (req.body.userid === req.params.id || ) {
    if (req.body.password) {
      const salt = bcrypt.genSalt(10);
      req.body.password = bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        },{ new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("Can not update!");
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
  try {
    const user = await User.findById(req.params.id)
    try {
      //delete all post from user
      await Post.deleteMany({username: user.username});
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
    catch (err){
      res.status(404).json("User not found")
    }
  } else {
    res.status(401).json("Can not delete!");
  }
});

module.exports = router;
