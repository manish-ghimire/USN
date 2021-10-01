const router = require("express").Router();
const User = require("../models/User");
const Uni = require("../models/Uni");
const Post = require("../models/Post");
const verify = require("./verify");
const bcrypt = require("bcrypt");
// Get Uni
// http://localhost:5000/api/unis/:uniName
router.get("/:uniName", verify, async (req, res) => {
    try {
        const uniName = await Uni.findOne({uniName: req.params.uniName});
        console.log(req.user.id);
            console.log(uniName);
            console.log({uniadmin: uniName.uniAdmin});
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
// http://localhost:5000/api/unis/register
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
                         uniName: req.body.uniName.replaceAll(/\s/g,''),
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
// put--> http://localhost:5000/api/unis/:uniName
router.put("/:uniName", verify, async (req, res) => {

        const uniName = await Uni.findOne({uniName: req.params.uniName});
        console.log({userid:req.user.id});
            console.log({uniId: uniName._id});
            console.log({uniadmin: uniName.uniAdmin});
              if (uniName.uniAdmin.includes(req.user.id) || req.user.isAdmin){
                if (req.body.uniAdmin !== req.user.id){
                  const updatedUniAdmin = await uniName.updateOne({ $push: {uniAdmin: req.body.uniAdmin}});
                  const {uniAdmin, ...other } = req.body;
                  const updatedUni = await uniName.updateOne({ $set: other});
                return res.status(200).json(req.body);
                }else{
    const {uniAdmin, ...other } = req.body;
            const updatedUni = await uniName.updateOne({ $set: other});
            return res.status(200).json(req.body);
                }

          } else{
              return res.status(401).json("Not authenticated!");
          }
});

// Delete Unis
// https://reqbin.com/
// delete--> http://localhost:5000/api/unis/:uniName
router.delete("/:uniName", verify, async (req, res) => {
        const uniName = await Uni.findOne({uniName: req.params.uniName});
            if (uniName){
              console.log({userid:req.user.id});
                  console.log({uniId: uniName._id});
                  console.log({uniadmin: uniName.uniAdmin});
              if (uniName.uniAdmin.includes(req.user.id) || req.user.isAdmin ){
                 await Post.deleteMany({userId: uniName._id});
                await User.findByIdAndDelete(uniName._id);
                  res.status(200).json("Uni deleted!");
          } else{
              return res.status(401).json("Not authenticated!");
          }
        }else{
          res.status(404).json("Uni not found");
        }
});
module.exports = router;
