const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const verify = require("./verify");
const bcrypt = require("bcrypt");

// Get User Via userId or Username
// http://localhost:5000/api/users/:id or username
router.get("/:id", verify, async (req, res) => {
    try {
        const usern = await User.findOne({username: req.params.id});
        if (!usern){
      const user = await User.findById(req.params.id);
      try {
          const {
              password,
              updatedAt,
              ...other
          } = user._doc;
          res.status(200).json(other);
      } catch (err) {
          res.status(500).json(err);
      }
        }
        else{
          try {
              const {
                  password,
                  updatedAt,
                  ...other
              } = usern._doc;
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
router.put("/:id", verify, async (req, res) => {
const reqUser = await User.findById(req.body.userId);
if (reqUser._doc.isAdmin){
console.log("just admin");
}
  if (req.body.userId === req.params.id || reqUser._doc.isAdmin){
        if (req.body.password) {
          try{
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
          }catch (err){
            return res.status(500).json(err);
          }
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {
                new: true
            });
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else if(!reqUser._doc.isAdmin){
      try {
          const updatedUser = await User.findByIdAndUpdate(req.params.id, {
              $unset: {isAdmin: req.body.isAdmin},
          }, {
              new: true
          });
          res.status(401).json("Can not update!");
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
// router.delete("/:id", verify, async (req, res) => {
//     if (req.body.userId === req.params.id) {
//         try {
//             const user = await User.findById(req.params.id)
//             try {
//                 //delete all post from user
//                 await Post.deleteMany({
//                     username: user.username
//                 });
//                 await User.findByIdAndDelete(req.params.id);
//                 res.status(200).json("User deleted!");
//             } catch (err) {
//                 res.status(500).json(err);
//             }
//         } catch (err) {
//             res.status(404).json("User not found")
//         }
//     } else {
//         res.status(401).json("Can not delete!");
//     }
// });

module.exports = router;
