const router = require("express").Router();
const User = require("../models/User");
const Uni = require("../models/Uni");
const Post = require("../models/Post");
const Club = require("../models/Club");
const verify = require("./verify");
const bcrypt = require("bcrypt");
// Get club group
// http://localhost:5000/api/club/:clubDisplayName
router.get("/:clubDisplayName", verify, async (req, res) => {
  try {
    const clubName = await Club.findOne({
      clubDisplayName: req.params.clubDisplayName
    });
    if (!clubName){
      const clubId = await Club.findOne({
        _id: req.params.clubDisplayName
      });
      try {

        const {
          updatedAt,
          ...other
        } = clubId._doc;
        res.status(200).json(other);
      } catch (err) {
        res.status(500).json(err);
      }
    }else{
    try {

      const {
        updatedAt,
        ...other
      } = clubName._doc;
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
  const clubGroups = await Club.find();
  res.status(200).json(clubGroups);
});

// create club
// http://localhost:5000/api/club/register
router.post("/register", verify, async (req, res) => {

  try {
    if (!req.body.clubName) {
      console.log({
        errors: "club Name field is required"
      });
      return res.status(422).json({
        error: "club Name field is required"
      });
    } else {

      const club = await Club.findOne({
        clubDisplayName: req.body.clubName.replace(/\s+/g, '')
      });
      if (club) {
        // backend error stuff
        let errors = {};
        if (club.clubDisplayName === req.body.clubName.replace(/\s+/g, '')) {
          errors.clubName = "club Name already exists";
        }
        return res.status(403).json({
          errors
        });
      } else {
        const newClub = new Club({
          clubName: req.body.clubName,
          clubDisplayName: req.body.clubName.replace(/\s+/g, ''),
          clubToUni: req.body.uniId,
          clubAdmin: req.user.id,
          desc: req.body.desc,
          coverPicture: req.body.coverPicture,
          profilePicture: req.body.profilePicture,
        });
        const clubToUni = await Uni.findById(req.body.uniId);
        // console.log(markCom);
        if (clubToUni){
      const clubToUniUpdate = await clubToUni.updateOne({ $push: { clubs: req.body.uniId } });
      console.log(clubToUni);
    }
        newClub.save();

        return res.status(200).json(newClub);
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
// put--> http://localhost:5000/api/club/:clubDisplayName
// update club group by id only for admin
    router.put("/:id", verify, async (req, res) => {
      const club = await Club.findOne({_id: req.params.id});
      console.log("isAdmin",req.user.isAdmin)
      if (club.clubAdmin.includes(req.user.id) || req.user.isAdmin) {
        //       console.log({"includes":club.clubAdmin.includes(req.user.id)});
        // if(req.body.clubAdmin || req.body.clubMember){
        if (!club.clubAdmin.includes(req.body.clubAdmin)) {
          const clubAdminUpdate = await Club.updateOne({
            $push: {
              clubAdmin: req.body.clubAdmin
            }
          });
          const clubToUser = await User.updateOne({
            $push: {
              clubGroups: req.params.id
            }
          });
            if (!club.clubMembers.includes(req.body.clubMember)) {
          const {
            clubAdmin,
            clubMembers,
            ...other
          } = req.body;
          const club = await club.findById(req.params.id);
          const clubUpdated = await club.update({
            $set: other,
            $push: {
              clubMembers: req.body.clubMember,
            },
          }, {
            multi: true,
          })

          console.log(
            "1"
          );
          res.status(200).json('club group has been updated!')
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
        return res.status(401).json("Not club group admin!!");
      }
    });
router.put("/:id/join", verify, async (req, res) => {
  const club = await Club.findOne({_id: req.params.id});
  if (club.clubMembers.includes(req.user.id) || club.clubAdmin.includes(req.user.id)) {
    console.log({error: "already joined"});
          return res.status(402).json({
            error: "already joined"
          });

        }else if (req.user.id === req.body.userId && !club.clubMembers.includes(req.user.id) || req.user.isAdmin) {
        //
                      const updateclubMember = await Club.updateOne({
                        $push: {
                          clubMembers: req.body.userId
                        }});
                        const userSMember = await User.findById(req.body.userId);
                        console.log("userSMember", userSMember);
                        const clubMembertoUserUpdated = await userSMember.updateOne({
                          $push: {
                            clubs: req.body.userId
                          }
                        });
                      console.log("user joined!")
                      return res.status(200).json("user joined!");
              } else if (club.clubAdmin.includes(req.user.id) || req.user.isAdmin) {
                      console.log('hrer');
                      const clubMemberUpdated = await Club.updateOne({
                        $push: {
                          clubMembers: req.body.userId
                        }});
                        const userSMember =  await User.findById(req.body.userId);
                        console.log('herere')
                        const clubMembertoUserUpdated = await userSMember.updateOne({
                          $push: {
                            clubs: req.body.userId
                          }
                        });
                      console.log("user joined!")
                      return res.status(200).json("user joined!");

                    }

console.log({"join":club});

});

router.put("/:id/leave", verify, async (req, res) => {
  const club = await Club.findOne({_id: req.params.id});
  if (req.user.id === req.body.userId || req.user.isAdmin){
    const clubMemberUpdated = await Club.updateOne({
              $pull: {
                clubMembers: req.body.userId
              }
            });
            return res.status(200).json("Left club group!");
          }else{
            return res.status(200).json("You are not apart of this club group!");
          }
                  if (club.clubAdmin.includes(req.user.id) || req.user.isAdmin) {
                    console.log("zzz");
                    if (club.clubAdmin.length < 2) {
                      if (req.body.clubAdmin){
                        const clubAdmiUpdated1 = await Club.updateOne({
                          $push: {
                              clubAdmin: req.body.clubAdmin
                            }
                        });
                        const clubAdmiUpdated2 = await Club.updateOne({
                           $pull: {
                            clubAdmin: req.user.id,
                            clubMembers: req.body.clubAdmin
                          }
                        });
                        const userSMember = await User.findById(req.user.id);
                          const userSAdmin = await User.findById(req.body.clubAdmin);
                          if (userSMember){
                            const clubAdmintoUserUpdated1 = await userSMember.updateOne({
                              $pull: {
                                  clubs: req.user.id
                                }
                            });
                          }
                           if (userSAdmin){
                            const clubAdmintoUserUpdated2 = await userSAdmin.updateOne({
                              $pull: {
                                  clubs: req.user.clubAdmin
                                }
                            });
                          }
                        return res.status(200).json("admin updated");
                      }else{
              return res.status(200).json("club group needs an admin");
                      }
                    }else{
                      console.log(">>>2");
                      const clubMemberUpdated = await Club.updateOne({
                        $pull: {
                          clubAdmin: req.user.id
                        }
                      });
                      const userSAdmin = await User.findById(req.body.clubAdmin);
                      if (userSAdmin){
                       const clubAdmintoUserUpdated2 = await userSAdmin.updateOne({
                         $pull: {
                             clubs: req.user.clubAdmin
                           }
                       });
                     }
                      return res.status(200).json("admin updated");
                    }
                } else {
            return res.status(200).json("You are not apart of this club group!");
          }
console.log({"leave":club});

});


// Delete clubs
// https://reqbin.com/
// delete--> http://localhost:5000/api/club/:clubDisplayName
router.delete("/:clubDisplayName", verify, async (req, res) => {
  const clubName = await Club.findOne({
    clubDisplayName: req.params.clubDisplayName
  });
  console.log(clubName);
  if (clubName) {

    if (clubName.clubAdmin.includes(req.user.id) || req.user.isAdmin) {
      // await club.deleteMany({
      //   userId: clubName._id
      // });

      await Club.findByIdAndDelete(clubName._id);
      res.status(200).json("club deleted!");
    } else {
      return res.status(401).json("Not authenticated!");
    }
  } else {
    res.status(404).json("club not found");
  }
});
module.exports = router;
