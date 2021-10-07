const router = require('express').Router()
const User = require('../models/User')
const Uni = require('../models/Uni')
const Post = require('../models/Post')
const Study = require('../models/Study')
const verify = require('./verify')
const bcrypt = require('bcrypt')
// Get study group
// http://localhost:5000/api/study/:studyDisplayName
router.get('/:studyDisplayName', verify, async (req, res) => {
  try {
    const studyName = await Study.findOne({
      studyDisplayName: req.params.studyDisplayName,
    })
    if (!studyName) {
      const studyId = await Study.findOne({
        _id: req.params.studyDisplayName,
      })
      try {
        const { updatedAt, ...other } = studyId._doc
        res.status(200).json(other)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      try {
        const { updatedAt, ...other } = studyName._doc
        res.status(200).json(other)
      } catch (err) {
        res.status(500).json(err)
      }
    }
  } catch (err) {
    return res.status(401).json('Not authenticated!')
  }
})

router.get('/', verify, async (req, res) => {
  const studyGroups = await Study.find()
  res.status(200).json(studyGroups)
})

// create study
// http://localhost:5000/api/study/register
router.post('/register', verify, async (req, res) => {
  try {
    if (!req.body.studyName) {
      console.log({
        errors: 'Study Name field is required',
      })
      return res.status(422).json({
        error: 'Study Name field is required',
      })
    } else {
      const study = await Study.findOne({
        studyDisplayName: req.body.studyName.replace(/\s+/g, ''),
      })
      if (study) {
        // backend error stuff
        let errors = {}
        if (study.studyDisplayName === req.body.studyName.replace(/\s+/g, '')) {
          errors.studyName = 'study Name already exists'
        }
        return res.status(403).json({
          errors,
        })
      } else {
        const newStudy = new Study({
          studyName: req.body.studyName,
          studyDisplayName: req.body.studyName.replace(/\s+/g, ''),
          studyAdmin: req.user.id,
          desc: req.body.desc,
          coverPicture: req.body.coverPicture,
          profilePicture: req.body.profilePicture,
        })

        newStudy.save()

        return res.status(200).json(newStudy)
      }
    }
  } catch (err) {
    return res.status(500).json({
      error: err,
    })
  }
})

//Update Users
// https://reqbin.com/
// put--> http://localhost:5000/api/study/:studyDisplayName
// router.put(/:studyDisplayName?join=:id)
// router.put(/:studyDisplayName?leave=:id)
router.put('/:studyDisplayName', verify, async (req, res) => {
  // const studyName = await Study.findOne({studyDisplayName: req.params.studyDisplayName});

  const joinStudy = req.query.join
  const leaveStudy = req.query.leave

  // console.log(leaveStudy)
  // if (studyDisplayName){
  const studyName = await Study.findOne({
    studyDisplayName: req.params.studyDisplayName,
  })

  async function studyUpdate(studyName) {
    // const studyName = await Study.findOne({studyDisplayName: req.params.studyDisplayName});
    // try{
    if (studyName.studyAdmin.includes(req.user.id) || req.user.isAdmin) {
      console.log({ includes: studyName.studyAdmin.includes(req.user.id) })
      if (req.body.studyAdmin) {
        const updatedStudyAdmin = await studyName.updateOne({
          $push: {
            studyAdmin: req.body.studyAdmin,
          },
        })
      }
      const { studyAdmin, studyMembers, ...other } = req.body
      const updatedStudy = await studyName.updateOne(
        {
          $set: other,
        },
        {
          $push: {
            studyMembers: req.body.studyMember,
          },
        }
      )
      res.status(200).json('Study group has been updated!')
    } else if (studyName.studyMembers.includes(req.user.id)) {
      return res.status(401).json('Not study group admin!')
    } else {
      return res.status(401).json('Not authenticated!')
    }
  }

  async function joinStudyGroup(joinStudy, studyName) {
    // try{
    if (joinStudy) {
      console.log(joinStudy)
      if (
        studyName.studyMembers.includes(req.user.id) ||
        studyName.studyMembers.includes(joinStudy) ||
        studyName.studyAdmin.includes(req.user.id) ||
        studyName.studyAdmin.includes(joinStudy)
      ) {
        console.log({ error: 'already joined' })
        return res.status(402).json({
          error: 'already joined',
        })
      } else if (
        (req.user.id === joinStudy &&
          !studyName.studyMembers.includes(req.user.id)) ||
        req.user.isAdmin
      ) {
        const updateStudyMember = await studyName.updateOne({
          $push: {
            studyMembers: joinStudy,
          },
        })
        const userSMember = await User.findById(joinStudy)
        console.log('userSMember', userSMember)
        const updatedStudyMembertoUser = await userSMember.updateOne({
          $push: {
            studyGroups: joinStudy,
          },
        })
        console.log('user joined!')
        return res.status(200).json('user joined!')
      } else if (
        studyName.studyAdmin.includes(req.user.id) ||
        req.user.isAdmin
      ) {
        console.log('hrer')
        const updateStudyMember = await studyName.updateOne({
          $push: {
            studyMembers: joinStudy,
          },
        })
        const userSMember = await User.findById(joinStudy)
        console.log('herere')
        const updatedStudyMembertoUser = await userSMember.updateOne({
          $push: {
            studyGroups: joinStudy,
          },
        })
        console.log('user joined!')
        return res.status(200).json('user joined!')
      }
    }
    // }
    // catch(err){
    //   return res.status(402).json({
    //     error: err
    //   });
    //
    // }
  }

  async function leaveStudyGroup(leaveStudy, studyName) {
    console.log('aaaaa', studyName)
    if (leaveStudy) {
      if (req.user.id === leaveStudy || req.user.isAdmin) {
        const updatedStudyMember = await studyName.updateOne({
          $pull: {
            studyMembers: leaveStudy,
          },
        })
        return res.status(200).json('Left study group!')
      } else {
        return res.status(200).json('You are not apart of this study group!')
      }
      if (studyName.studyAdmin.includes(req.user.id) || req.user.isAdmin) {
        console.log('zzz')
        if (studyName.studyAdmin.length < 2) {
          if (req.body.studyAdmin) {
            const updatedStudyAdmin1 = await studyName.updateOne({
              $push: {
                studyAdmin: req.body.studyAdmin,
              },
            })
            const updatedStudyAdmin2 = await studyName.updateOne({
              $pull: {
                studyAdmin: req.user.id,
                studyMembers: req.body.studyAdmin,
              },
            })
            const userSMember = await User.findById(req.user.id)
            const userSAdmin = await User.findById(req.body.studyAdmin)
            if (userSMember) {
              const updatedStudyAdmintoUser = await userSMember.updateOne({
                $pull: {
                  studyGroups: req.user.id,
                },
              })
            }
            if (userSAdmin) {
              const updatedStudyAdmintoUser2 = await userSAdmin.updateOne({
                $pull: {
                  studyGroups: req.user.studyAdmin,
                },
              })
            }
            return res.status(200).json('admin updated')
          } else {
            return res.status(200).json('study group needs an admin')
          }
        } else {
          console.log('>>>2')
          const updatedStudyMember = await studyName.updateOne({
            $pull: {
              studyAdmin: req.user.id,
            },
          })
          const userSAdmin = await User.findById(req.body.studyAdmin)
          if (userSAdmin) {
            const updatedStudyAdmintoUser2 = await userSAdmin.updateOne({
              $pull: {
                studyGroups: req.user.studyAdmin,
              },
            })
          }
          return res.status(200).json('admin updated')
        }
      } else {
        return res.status(200).json('You are not apart of this study group!')
      }
    }
  }
  // if (req.body){
  //       studyUpdate(studyName);
  //     }
  //       joinStudyGroup(joinStudy);
  //       if(leaveStudy){
  //       leaveStudyGroup(leaveStudy);
  //     }
  //     const studyName = await Study.findOne({
  //       _id: req.params.studyDisplayName
  //     });
  console.log(studyName)
  if (!studyName) {
    if (studyName.studyAdmin.includes(req.user.id)) {
      console.log('is a study admin')
    } else if (studyName.studyMembers.includes(req.user.id)) {
      console.log('is a study member')
    } else if (req.user.isAdmin) {
      console.log('is admin')
    } else {
      console.log('is a not a member')
      joinStudyGroup(joinStudy)
    }
  }
  // }
})

// Delete studys
// https://reqbin.com/
// delete--> http://localhost:5000/api/study/:studyDisplayName
router.delete('/:studyDisplayName', verify, async (req, res) => {
  const studyName = await Study.findOne({
    _id: req.params.studyDisplayName,
  })
  console.log(studyName)
  if (studyName) {
    if (studyName.studyAdmin.includes(req.user.id) || req.user.isAdmin) {
      // await Study.deleteMany({
      //   userId: studyName._id
      // });

      await Study.findByIdAndDelete(studyName._id)
      res.status(200).json('study deleted!')
    } else {
      return res.status(401).json('Not authenticated!')
    }
  } else {
    res.status(404).json('study not found')
  }
})
module.exports = router
