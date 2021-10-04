const router = require("express").Router();
const User = require("../models/User");
const Uni = require("../models/Uni");
const Post = require("../models/Post");
const Study = require("../models/Study");
const verify = require("./verify");
const bcrypt = require("bcrypt");
// Get study group
// http://localhost:5000/api/study/:studyDisplayName
router.get("/:studyDisplayName", verify, async (req, res) => {
  try {
    const studyName = await Study.findOne({
      studyDisplayName: req.params.studyDisplayName
    });
    try {

      const {
        updatedAt,
        ...other
      } = studyName._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    return res.status(401).json("Not authenticated!")
  }
});

// create study
// http://localhost:5000/api/study/register
router.post("/register", verify, async (req, res) => {

  try {
    if (!req.body.studyName) {
      console.log({
        errors: "Study Name field is required"
      });
      return res.status(422).json({
        error: "Study Name field is required"
      });
    } else {

      const study = await Study.findOne({
        studyDisplayName: req.body.studyName.replace(/\s+/g, '')
      });
      if (study) {
        // backend error stuff
        let errors = {};
        if (study.studyDisplayName === req.body.studyName.replace(/\s+/g, '')) {
          errors.studyName = "study Name already exists";
        }
        return res.status(403).json({
          errors
        });
      } else {
        const newStudy = new Study({
          studyName: req.body.studyName,
          studyDisplayName: req.body.studyName.replace(/\s+/g, ''),
          studyAdmin: req.user.id
        });

        newStudy.save();

        return res.status(200).json(newStudy);
      }

    }
  } catch (err) {
    return res.status(500).json({
      error: err
    });
  }

});

//Update Users
// https://reqbin.com/
// put--> http://localhost:5000/api/study/:studyDisplayName
router.put("/:studyDisplayName", verify, async (req, res) => {
  // router.put(/:studyDisplayName?join=:id/)
  // const studyName = await Study.findOne({studyDisplayName: req.params.studyDisplayName});


  const joinStudy = req.query.join;
  const leaveStudy = req.query.leave;
  // console.log(leaveStudy)
  // if (studyDisplayName){
  const studyName = await Study.findOne({
    studyDisplayName: req.params.studyDisplayName
  });

async function joinStudyGroup(joinStudy){
  if (joinStudy) {
    // const studyName = await Study.findOne({
    //   studyDisplayName: req.params.studyDisplayName
    // });
    if (studyName.studyMembers.includes(req.user.id)) {

      return res.status(402).json({
        error: "already joined"
      });
    } else if (req.user.id === joinStudy && !studyName.studyMembers.includes(req.user.id) || req.user.isAdmin) {

            const updatedStudyMember = await studyName.updateOne({
              $push: {
                studyMembers: req.user.id
              }});
            console.log("user joined!")
            return res.status(200).json("user joined!");

    }
  }
}


async function leaveStudyGroup(leaveStudy) {
console.log('aaaaa');
  if (leaveStudy) {
      if (!studyName.studyAdmin.includes(req.user.id) && req.user.id == leaveStudy || req.user.isAdmin) {
        if (studyName.studyMembers.includes(req.user.id)) {
        const updatedStudyMember = await studyName.updateOne({
          $pull: {
            studyMembers: req.user.id
          }
        });
        return res.status(200).json("Left study group!");
      }else{
        return res.status(200).json("You are not apart of this study group!");
      }
      }else if (studyName.studyAdmin.includes(req.user.id) || req.user.isAdmin) {
          console.log("zzz");
          if (studyName.studyAdmin.length < 2) {
            if (req.body.studyAdmin){
              const updatedStudyAdmin1 = await studyName.updateOne({
                $push: {
                    studyAdmin: req.body.studyAdmin
                  }
              });
              const updatedStudyAdmin2 = await studyName.updateOne({
                 $pull: {
                  studyAdmin: req.user.id,
                  studyMembers: req.body.studyAdmin
                }
              });
              return res.status(200).json("admin updated");
            }else{
    return res.status(200).json("study group needs an admin");
            }
          }else{
            console.log(">>>2");
            const updatedStudyMember = await studyName.updateOne({
              $pull: {
                studyAdmin: req.user.id
              }
            });
            return res.status(200).json("admin updated");

          }
      } else {
  return res.status(200).json("You are not apart of this study group!");
      }
  }
}

  async function study(studyName) {
    // const studyName = await Study.findOne({studyDisplayName: req.params.studyDisplayName});
// try{
    if (studyName.studyAdmin.includes(req.user.id) || req.user.isAdmin) {
      console.log({"includes":studyName.studyAdmin.includes(req.user.id)});
      if(req.body.studyAdmin){
        const updatedStudyAdmin = await studyName.updateOne({
          $push: {
            studyAdmin: req.body.studyAdmin
          }
        });
      }
      if (req.body){
        const {
          studyAdmin,
          studyMembers,
          ...other
        } = req.body;
        const updatedStudy = await studyName.updateOne({
          $set: other
        }, {
          $push: {
            studyMembers: req.body.studyMember
          }
        }, {
          new: true
        });
        return res.status(200).json(studyName);
}
    } else if (studyName.studyMembers.includes(req.user.id) || req.user.isAdmin) {
      console.log(req.body);
      if (req.body) {
        const {
          uniAdmin,
          studyMembers,
          studyName,
          ...other
        } = req.body;
        const updatedStudy = await studyName.updateOne({
          $set: other
        }, {
          $push: {
            studyMembers: req.body.studyMember
          }
        }, {
          new: true
        });
        return res.status(200).json(studyName);
      } else {
        return res.status(403).json('req body empty');
      }
    } else {
      return res.status(401).json("Not authenticated!");
    }

  }


    if (!studyName.studyAdmin.includes(req.user.id) || !studyName.studyMembers.includes(req.user.id) || !req.user.isAdmin) {
joinStudyGroup(joinStudy);
leaveStudyGroup(leaveStudy);

    } else if (studyName.studyAdmin.includes(req.user.id)) {
console.log("is a study admin");
      // study(studyName);
      // joinStudyGroup(joinStudy);
      leaveStudyGroup(leaveStudy);
    }
    else if (studyName.studyMembers.includes(req.user.id)) {
console.log("is a study member");
  leaveStudyGroup(leaveStudy);
} else {
    console.log("is admin");
    // study(studyName);
    // joinStudyGroup(joinStudy);
    leaveStudyGroup(leaveStudy);
  }

  // }
});

// Delete studys
// https://reqbin.com/
// delete--> http://localhost:5000/api/study/:studyDisplayName
router.delete("/:studyDisplayName", verify, async (req, res) => {
  const studyName = await Study.findOne({
    studyName: req.params.studyName
  });
  if (studyName) {
    console.log({
      userid: req.user.id
    });
    console.log({
      studyId: studyName._id
    });
    console.log({
      studyadmin: studyName.studyAdmin
    });
    if (studyName.studyAdmin.includes(req.user.id) || req.user.isAdmin) {
      await Post.deleteMany({
        userId: studyName._id
      });
      await User.findByIdAndDelete(studyName._id);
      res.status(200).json("study deleted!");
    } else {
      return res.status(401).json("Not authenticated!");
    }
  } else {
    res.status(404).json("study not found");
  }
});
module.exports = router;
