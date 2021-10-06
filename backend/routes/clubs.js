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
  // router.put(/:clubDisplayName?join=:id)
    // router.put(/:clubDisplayName?leave=:id)
router.put("/:clubDisplayName", verify, async (req, res) => {

  // const clubName = await club.findOne({clubDisplayName: req.params.clubDisplayName});


  const joinClub = req.query.join;
  const leaveClub = req.query.leave;
  // console.log(leaveclub)
  // if (clubDisplayName){
  const clubName = await Club.findOne({
    clubDisplayName: req.params.clubDisplayName
  });

  async function clubUpdate(clubName) {
try{
    if (clubName.clubAdmin.includes(req.user.id) || req.user.isAdmin) {
      console.log({"includes":clubName.clubAdmin.includes(req.user.id)});
      if(req.body.clubAdmin){
        const updatedClubAdmin = await clubName.updateOne({
          $push: {
            clubAdmin: req.body.clubAdmin
          }
        });
      }
        const {
          clubAdmin,
          clubMembers,
          ...other
        } = req.body;
        const updatedClub = await clubName.updateOne({
          $set: other
        }, {
          $push: {
            clubMembers: req.body.clubMember
          }
        });
         res.status(200).json('Club group has been updated!')
    } else if (clubName.clubMembers.includes(req.user.id)) {
        return res.status(401).json("Not club group admin!");
    } else {
      return res.status(401).json("Not authenticated!");
    }
  }
catch (err){
  return res.status(401).json(err);
}
  }

async function joinClubGroup(joinClub){
  if (joinClub) {
    // const clubName = await club.findOne({
    //   clubDisplayName: req.params.clubDisplayName
    // });
    if (clubName.clubMembers.includes(req.user.id)) {

      return res.status(402).json({
        error: "already joined"
      });
    } else if (req.user.id === joinClub && !clubName.clubMembers.includes(req.user.id) || req.user.isAdmin) {

            const updateClubMember = await clubName.updateOne({
              $push: {
                clubMembers: req.user.id
              }});
            console.log("user joined!")
            return res.status(200).json("user joined!");

    }
  }
}


async function leaveClubGroup(leaveClub) {
console.log('leaaaaaave');
  if (leaveClub) {
if (req.user.id === leaveClub || req.user.isAdmin){
        const updatedClubMember = await clubName.updateOne({
          $pull: {
            clubMembers: leaveClub
          }
        });
        return res.status(200).json("Left club group!");
      }else{
        return res.status(200).json("You are not apart of this club group!");
      }
       if (clubName.clubAdmin.includes(req.user.id) || req.user.isAdmin) {
          console.log("zzz");
          if (clubName.clubAdmin.length < 2) {
            if (req.body.clubAdmin){
              const updatedClubAdmin1 = await clubName.updateOne({
                $push: {
                    clubAdmin: req.body.clubAdmin
                  }
              });
              const updatedClubAdmin2 = await clubName.updateOne({
                 $pull: {
                  clubAdmin: req.user.id,
                  clubMembers: req.body.clubAdmin
                }
              });
              return res.status(200).json("admin updated");
            }else{
    return res.status(200).json("club group needs an admin");
            }
          }else{
            console.log(">>>2");
            const updatedClubMember = await clubName.updateOne({
              $pull: {
                clubAdmin: req.user.id
              }
            });
            return res.status(200).json("admin updated");
          }
      } else {
  return res.status(200).json("You are not apart of this club group!");
      }
  }
}



if (clubName.clubAdmin.includes(req.user.id)) {
console.log("is a club admin");
if (req.body){
    clubUpdate(clubName);
  }
    if(leaveClub){
    leaveClubGroup(leaveClub);
  }
  }
  else if (clubName.clubMembers.includes(req.user.id)) {
console.log("is a club member");
if(leaveClub){
leaveClubGroup(leaveClub);
}
} else if (req.user.isAdmin) {
  console.log("is admin");
  if (req.body){
  clubUpdate(clubName);
}
if (joinClub){
  joinClubGroup(joinClub);
}
  if(leaveClub){
  leaveClubGroup(leaveClub);
}
}
else{
console.log("is a not a member");
joinclubGroup(joinclub);
}

// }
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
