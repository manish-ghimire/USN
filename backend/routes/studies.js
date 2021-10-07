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
    const studyGroup = await Study.findOne({
      studyDisplayName: req.params.studyDisplayName
    });
    if (!studyGroup){
      const studyId = await Study.findOne({
        _id: req.params.studyDisplayName
      });
      try {

        const {
          updatedAt,
          ...other
        } = studyId._doc;
        res.status(200).json(other);
      } catch (err) {
        res.status(500).json(err);
      }
    }else{
    try {

      const {
        updatedAt,
        ...other
      } = studyGroup._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  } catch (err) {
    return res.status(401).json("Not authenticated!")
  }
});

router.get("/", verify, async (req, res) => {
  const studyGroups = await Study.find();
  res.status(200).json(studyGroups);
});

// create study
// http://localhost:5000/api/study/register
router.post("/register", verify, async (req, res) => {

  try {
    if (!req.body.studyGroup) {
      console.log({
        errors: "Study Name field is required"
      });
      return res.status(422).json({
        error: "Study Name field is required"
      });
    } else {

      const study = await Study.findOne({
        studyDisplayName: req.body.studyGroup.replace(/\s+/g, '')
      });
      if (study) {
        // backend error stuff
        let errors = {};
        if (study.studyDisplayName === req.body.studyGroup.replace(/\s+/g, '')) {
          errors.studyGroup = "study Name already exists";
        }
        return res.status(403).json({
          errors
        });
      } else {
        const newStudy = new Study({
          studyGroup: req.body.studyGroup,
          studyDisplayName: req.body.studyGroup.replace(/\s+/g, ''),
          studyAdmin: req.user.id,
          desc: req.body.desc,
          coverPicture: req.body.coverPicture,
          profilePicture: req.body.profilePicture
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
// update study group by id only for admin
router.put("/:id", verify, async (req, res) => {
  const study = await Study.findOne({
    _id: req.params.id
  });
  console.log("isAdmin", req.user.isAdmin)
  if (study.studyAdmin.includes(req.user.id) || req.user.isAdmin) {
    //       console.log({"includes":study.studyAdmin.includes(req.user.id)});
    // if(req.body.studyAdmin || req.body.studyMember){
    if (!study.studyAdmin.includes(req.body.studyAdmin)) {
      const studyAdminUpdate = await Study.updateOne({
        $push: {
          studyAdmin: req.body.studyAdmin
        }
      });
      const studyToUser = await User.updateOne({
        $push: {
          studyGroups: req.params.id
        }
      });
        if (!study.studyMembers.includes(req.body.studyMember)) {
      const {
        studyAdmin,
        studyMembers,
        ...other
      } = req.body;
      const study = await Study.findById(req.params.id);
      const studyUpdated = await study.update({
        $set: other,
        $push: {
          studyMembers: req.body.studyMember,
        },
      }, {
        multi: true,
      })

      console.log(
        "1"
      );
      res.status(200).json('study group has been updated!')
    }else {
      console.log({
        error: "already joined"
      });
      return res.status(402).json({
        error: "already joined"
      });
    }
    } else {
      console.log({
        error: "already joined"
      });
      return res.status(402).json({
        error: "already joined"
      });
    }
  }else{
    return res.status(401).json("Not study group admin!!");
  }

  //   if (!study.studyMembers.includes(req.body.studyMember) || req.user.isAdmin) {
  //     const {
  //       studyAdmin,
  //       studyMembers,
  //       ...other
  //     } = req.body;
  //     const study = await Study.findById(req.params.id);
  //     const studyUpdated = await study.update({
  //       $set: other,
  //       $push: {
  //         studyMembers: req.body.studyMember,
  //       },
  //     }, {
  //       multi: true,
  //     })
  //     const studyToUser = await User.findByIdAndUpdate(req.params.userId, {
  //       $push: {
  //         studyGroups: req.params.userId
  //       }
  //     });
  //     console.log(
  //       "2"
  //     );
  //     res.status(200).json('study group has been updated!')
  // }
    // else{
    //     return res.status(401).json("Not study group admin!!");
  //   // }
  // } else{
  //     return res.status(401).json("Not study group admin!!!");
  // }
  // if(!study.studyAdmin.includes(req.user.id)){
  //   return res.status(401).json("Not study group admin!");
  // } else {
  //   return res.status(401).json("Not authenticated!");
  // }

//
// console.log({"3":"studyUpdated"});
// console.log({"update":study});

});
router.put("/:id/join", verify, async (req, res) => {
  const studyGroup = await Study.findOne({_id: req.params.id});
  if (studyGroup.studyMembers.includes(req.user.id) || studyGroup.studyAdmin.includes(req.user.id)) {
    console.log({error: "already joined"});
          return res.status(402).json({
            error: "already joined"
          });

        }else if (req.user.id === req.body.userId && !studyGroup.studyMembers.includes(req.user.id) || req.user.isAdmin) {
        //
                      const updateStudyMember = await studyGroup.updateOne({
                        $push: {
                          studyMembers: req.body.userId
                        }});
                        const userSMember = await User.findById(req.body.userId);
                        console.log("userSMember", userSMember);
                        const studyMembertoUserUpdated = await userSMember.updateOne({
                          $push: {
                            studyGroups: req.body.userId
                          }
                        });
                      console.log("user joined!")
                      return res.status(200).json("user joined!");
              } else if (studyGroup.studyAdmin.includes(req.user.id) || req.user.isAdmin) {
                      console.log('hrer');
                      const studyMemberUpdated = await studyGroup.updateOne({
                        $push: {
                          studyMembers: req.body.userId
                        }});
                        const userSMember =  await User.findById(req.body.userId);
                        console.log('herere')
                        const studyMembertoUserUpdated = await userSMember.updateOne({
                          $push: {
                            studyGroups: req.body.userId
                          }
                        });
                      console.log("user joined!")
                      return res.status(200).json("user joined!");

                    }

console.log({"join":studyGroup});

});

router.put("/:id/leave", verify, async (req, res) => {
  const studyGroup = await Study.findOne({_id: req.params.id});
  if (req.user.id === req.body.userId || req.user.isAdmin){
    const studyMemberUpdated = await studyGroup.updateOne({
              $pull: {
                studyMembers: req.body.userId
              }
            });
            return res.status(200).json("Left study group!");
          }else{
            return res.status(200).json("You are not apart of this study group!");
          }
                  if (studyGroup.studyAdmin.includes(req.user.id) || req.user.isAdmin) {
                    console.log("zzz");
                    if (studyGroup.studyAdmin.length < 2) {
                      if (req.body.studyAdmin){
                        const studyAdmiUpdated1 = await studyGroup.updateOne({
                          $push: {
                              studyAdmin: req.body.studyAdmin
                            }
                        });
                        const studyAdmiUpdated2 = await studyGroup.updateOne({
                           $pull: {
                            studyAdmin: req.user.id,
                            studyMembers: req.body.studyAdmin
                          }
                        });
                        const userSMember = await User.findById(req.user.id);
                          const userSAdmin = await User.findById(req.body.studyAdmin);
                          if (userSMember){
                            const studyAdmintoUserUpdated1 = await userSMember.updateOne({
                              $pull: {
                                  studyGroups: req.user.id
                                }
                            });
                          }
                           if (userSAdmin){
                            const studyAdmintoUserUpdated2 = await userSAdmin.updateOne({
                              $pull: {
                                  studyGroups: req.user.studyAdmin
                                }
                            });
                          }
                        return res.status(200).json("admin updated");
                      }else{
              return res.status(200).json("study group needs an admin");
                      }
                    }else{
                      console.log(">>>2");
                      const studyMemberUpdated = await studyGroup.updateOne({
                        $pull: {
                          studyAdmin: req.user.id
                        }
                      });
                      const userSAdmin = await User.findById(req.body.studyAdmin);
                      if (userSAdmin){
                       const studyAdmintoUserUpdated2 = await userSAdmin.updateOne({
                         $pull: {
                             studyGroups: req.user.studyAdmin
                           }
                       });
                     }
                      return res.status(200).json("admin updated");
                    }
                } else {
            return res.status(200).json("You are not apart of this study group!");
          }
console.log({"leave":studyGroup});

});


// Delete studys
// https://reqbin.com/
// delete--> http://localhost:5000/api/study/:studyDisplayName
router.delete("/:studyDisplayName", verify, async (req, res) => {
  const studyGroup = await Study.findOne({
    studyDisplayName: req.params.studyDisplayName
  });
  console.log(studyGroup);
  if (studyGroup) {

    if (studyGroup.studyAdmin.includes(req.user.id) || req.user.isAdmin) {
      // await Study.deleteMany({
      //   userId: studyGroup._id
      // });

      await Study.findByIdAndDelete(studyGroup._id);
      res.status(200).json("study deleted!");
    } else {
      return res.status(401).json("Not authenticated!");
    }
  } else {
    res.status(404).json("study not found");
  }
});
module.exports = router;
