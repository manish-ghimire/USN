const router = require("express").Router();
const User = require("../models/User");
const Uni = require("../models/Uni");
const verify = require("./verify");
const bcrypt = require("bcrypt");
// Get Uni
router.get("/:uniName", verify, async (req, res) => {

    try {

        const uniName = await Uni.findOne({uniName: req.params.uniName});
        console.log(req.user.uniAdmin);
            console.log(uniName.uniAdmin);
        if (!uniName){
      const uniId = await Uni.findById(req.params.uniName);
      try {
          const {updatedAt, ...other } = uniId._doc;
          res.status(200).json(other);
      } catch (err) {
          res.status(500).json(err);
      }
        }
        else{
          try {

              const {updatedAt, ...other } = uniName._doc;
              res.status(200).json(other);
          } catch (err) {
              res.status(500).json(err);
          }
        }
    } catch (err) {
    return res.status(401).json("Not authenticated!")
    }
});

// create Uni
// find email or username
router.post("/register", verify, (req, res) => {
  try{
Uni.findOne({ uniName: req.body.uniName }).then(uni => {
        if (uni) {
          // backend error stuff
            let errors = {};
            if (uni.uniName === req.body.uniName || uni.email === req.body.email ) {
                errors.uniName = "Uni or email already exists";
            }
            console.log({errors:errors});
            return res.status(500).json(errors);

        } else {
          const newUni = new Uni({
                         uniName: req.body.uniName,
                         email: req.body.email,
                         uniAdmin: req.user.id
                     });

                            newUni.save();

                   return res.status(200).json(newUni);
                 }

                 // need to update user 
    });
  }
  catch(err){
    return res.status(500).json({
        error: err
    });
  }
  });

//Update User
// https://reqbin.com/
// post--> http://localhost:5000/api/users/:id
router.put("/:uniName", verify, (req, res) => {
    const uniAdmin = Uni.findOne({uniAdmin: req.params.uniName});
        const user = req.user.uniAdmin;
        console.log(user);
        console.log(uniName.uniAdmin);
  if (req.user.id === req.params.id  ) {
    try {
      const updatedUser = Uni.findByIdAndUpdate(req.params.id, {
          "$set": req.body,
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
// router.delete("/:id", verify, async (req, res) => {
//   if (req.user.id === req.params.id) {
//   try {
//     const user = await User.findById(req.params.id)
//     try {
//       //delete all post from user
//       await Post.deleteMany({username: user.username});
//       await User.findByIdAndDelete(req.params.id);
//       res.status(200).json("User deleted!");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
//     catch (err){
//       res.status(404).json("User not found")
//     }
//   } else {
//     res.status(401).json("Can not delete!");
//   }
// });

module.exports = router;
