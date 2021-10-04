const router = require("express").Router();
const User = require("../models/User");
const Uni = require("../models/Uni");
const Post = require("../models/Post");
const Study = require("../models/Study");
const verify = require("./verify");
const bcrypt = require("bcrypt");
// Get Uni
// http://localhost:5000/api/unis/:uniName
router.get("/:studyName", verify, async (req, res) => {
    try {
        const studyName = await Study.findOne({studyName: req.params.studyName});
        console.log(req.user.id);
            console.log(studyName);
            console.log({studyAdmin: studyName.studyAdmin});
          try {

              const {updatedAt, ...other } = studyName._doc;
              res.status(200).json(other);
          } catch (err) {
              res.status(500).json(err);
          }
    } catch (err) {
    return res.status(401).json("Not authenticated!")
    }
});

// create study
// http://localhost:5000/api/studies/register
router.post("/register", verify, (req, res) => {
  try{
Study.findOne({ studyName: req.body.studyName }).then(study => {
        if (study) {
          // backend error stuff
            let errors = {};
            if (study.studyName === req.body.studyName || study.email === req.body.email ) {
                errors.studyName = "study or email already exists";
            }
            console.log({errors:errors});
            return res.status(500).json(errors);

        } else {
          const newstudy = new Study({
                         studyName: req.body.studyName,
                         email: req.body.email,
                         studyAdmin: req.user.id
                     });

                            newstudy.save();

                   return res.status(200).json(newstudy);
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
// put--> http://localhost:5000/api/studies/:studyName
router.put("/:studyName", verify, async (req, res) => {

  const studyName = await Study.findOne({studyName: req.params.studyName});
  console.log({userid:req.user.id});
      console.log({studyId: studyName._id});
      console.log({studyadmin: studyName.studyAdmin});
        if (studyName.studyAdmin.includes(req.user.id) || req.user.isAdmin){
          if (req.body.studyAdmin !== req.user.id){
            const updatedStudyAdmin = await studyName.updateOne({ $push: {studyAdmin: req.body.studyAdmin}});
            const {studyAdmin, ...other } = req.body;
            const updatedstudy = await studyName.updateOne({ $set: other});
          return res.status(200).json(req.body);
          }else{
const {studyAdmin, ...other } = req.body;
      const updatedstudy = await studyName.updateOne({ $set: other});
      return res.status(200).json(req.body);
          }

    } else{
        return res.status(401).json("Not authenticated!");
    }
});

// Delete studys
// https://reqbin.com/
// delete--> http://localhost:5000/api/studies/:studyName
router.delete("/:studyName", verify, async (req, res) => {
        const studyName = await Study.findOne({studyName: req.params.studyName});
            if (studyName){
              console.log({userid:req.user.id});
                  console.log({studyId: studyName._id});
                  console.log({studyadmin: studyName.studyAdmin});
              if (studyName.studyAdmin.includes(req.user.id) || req.user.isAdmin ){
                 await Post.deleteMany({userId: studyName._id});
                await User.findByIdAndDelete(studyName._id);
                  res.status(200).json("study deleted!");
          } else{
              return res.status(401).json("Not authenticated!");
          }
        }else{
          res.status(404).json("study not found");
        }
});
module.exports = router;
