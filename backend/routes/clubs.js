const router = require('express').Router()
const User = require('../models/User')
const Uni = require('../models/Uni')
const Club = require('../models/Club')
const verify = require('./verify')

router.get('/:clubId', verify, async (req, res) => {
  try {
    const clubName = await Club.findOne({
      clubDisplayName: req.params.clubId,
    })
    if (!clubName) {
      const clubId = await Club.findOne({
        _id: req.params.clubId,
      })
      try {
        const { updatedAt, ...other } = clubId._doc
        res.status(200).json(other)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      try {
        const { updatedAt, ...other } = clubName._doc
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
  const clubGroups = await Club.find()
  res.status(200).json(clubGroups)
})

router.post('/register', verify, async (req, res) => {
  // try {
  if (!req.body.clubName) {
    console.log({
      errors: 'club Name field is required',
    })
    return res.status(422).json({
      error: 'club Name field is required',
    })
  } else {
    const club = await Club.findOne({
      clubDisplayName: req.body.clubName.replace(/\s+/g, ''),
    })
    if (club) {
      // backend error stuff
      let errors = {}
      if (club.clubDisplayName === req.body.clubName.replace(/\s+/g, '')) {
        errors.clubName = 'club Name already exists'
      }
      return res.status(403).json({
        errors,
      })
    } else {
      const newClub = new Club({
        clubName: req.body.clubName,
        clubDisplayName: req.body.clubName.replace(/\s+/g, ''),
        uniId: req.body.uniId,
        clubAdmin: req.user.id,
        desc: req.body.desc,
        coverPicture: req.body.coverPicture,
        profilePicture: req.body.profilePicture,
      })
      newClub.save()

      const oneUni = await Uni.findById(req.body.uniId)
      if (oneUni) {
        const uniIdUpdate = await oneUni.updateOne({
          $push: { clubs: '' + newClub._id + '' },
        })
      }

      return res.status(200).json(newClub)
    }
  }
  // } catch (err) {
  // return res.status(500).json({
  //   error: err,
  // })
  // }
})

router.put('/:id', verify, async (req, res) => {
  const club = await Club.findOne({ _id: req.params.id })
  console.log('isAdmin', req.user.isAdmin)
  if (club.clubAdmin.includes(req.user.id) || req.user.isAdmin) {
    console.log(req.body.clubAdmin);
    if(req.body.clubAdmin){
    if (!club.clubAdmin.includes(req.body.clubAdmin)) {
      if(!club.clubMembers.includes(req.body.clubMember)){
      const clubAdminUpdate = await club.updateOne({
        $push: {
          clubAdmin: req.body.clubAdmin,
        },
      })

      const user = await User.findById(req.body.clubAdmin)
      const clubToUser = await user.updateOne({
        $push: {
          clubs: req.params.id,
        },
      })
            res.status(200).json('club group has been updated!')
            const clubAdminUpdate1 = await club.updateOne({
              $pull: {
                clubMembers: req.body.clubAdmin,
              },
            })
          }else{
            const clubAdminUpdate2 = await club.updateOne({
              $push: {
                clubAdmin: req.body.clubAdmin,
              },
            })

              res.status(200).json('club group has been updated!')
          }
    }else {
      console.log({
        error: 'already joined',
      })
      return res.status(402).json({
        error: 'already joined',
      })
    }
  } else if (req.body.clubMember){
      if (!club.clubMembers.includes(req.body.clubMember)) {
        const club = await Club.findById(req.params.id)
        const clubMemberUpdate = await club.updateOne({
          $push: {
            clubMembers: req.body.clubMember,
          },
        })
        // const clubUpdated = await club.update(
        //   {
        //     $set: other,
        //     $push: {
        //       clubMembers: req.body.clubMember,
        //     },
        //   },
        //   {
        //     multi: true,
        //   }
        // )
        res.status(200).json('club group has been updated!')
    } else {
      console.log({
        error: 'already joined',
      })
      return res.status(402).json({
        error: 'already joined',
      })
    }
  } else{
    const { clubAdmin, clubMembers, ...other } = req.body
    const club = await Club.findById(req.params.id)
    const clubUpdated = await club.update(
      {
        $set: other
      }
    )
     res.status(200).json('club group has been updated!!')
  }
  } else {
    return res.status(401).json('Not club group admin!!')
  }
})

router.delete('/:clubId', verify, async (req, res) => {
  const clubName = await Club.findOne({
    _id: req.params.clubId,
  })
  console.log(clubName)
  if (clubName) {
    if (clubName.clubAdmin.includes(req.user.id) || req.user.isAdmin) {
      await Club.findByIdAndDelete(clubName._id)
      res.status(200).json('club deleted!')
    } else {
      return res.status(401).json('Not authenticated!')
    }
  } else {
    res.status(404).json('club not found')
  }
})

//**********************************************

router.put('/:id/join', verify, async (req, res) => {
  const club = await Club.findOne({ _id: req.params.id })
  if (
    club.clubMembers.includes(req.user.id) ||
    club.clubAdmin.includes(req.user.id)
  ) {
    console.log({ error: 'already joined' })
    return res.status(402).json({
      error: 'already joined',
    })
  } else if (!club.clubMembers.includes(req.user.id)) {
    //
    const clubMemberUpdated = await club.updateOne({
      $push: {
        clubMembers: req.user.id,
      },
    })


        const userCMember = await User.findById(req.user.id)
    const clubMembertoUserUpdated = await userCMember.updateOne({
      $push: {
        clubs: req.params.id,
      },
    })
        console.log('userCMember', userCMember)
    console.log('user joined!')
    return res.status(200).json('user joined!')
  } else if (club.clubAdmin.includes(req.user.id) || req.user.isAdmin) {
    console.log('hrer')
    const clubMemberUpdated = await Club.updateOne({
      $push: {
        clubMembers: req.body.clubMember,
      },
    })
    const clubAdminUpdated = await Club.updateOne({
      $push: {
        clubAdmin: req.body.clubAdmin,
      },
    })
    const userCMember = await User.findById(req.body.clubAdmin)
    console.log('herere')
    const clubMembertoUserUpdated = await userCMember.updateOne({
      $push: {
        clubs: req.params.id,
      },
    })
    console.log('user joined!')
    return res.status(200).json('user joined!')
  }

  console.log({ join: club })
})
router.put('/:id/leave', verify, async (req, res) => {
  const club = await Club.findOne({ _id: req.params.id })
  if (club.clubMembers.includes(req.user.id)) {
    console.log('1member')
    const clubMemberUpdated = await club.updateOne({
      $pull: {
        clubMembers: req.user.id,
      },
    })
    const userCMember = await User.findById(req.user.id)
    if (userCMember) {
      const clubMembertoUserUpdated = await userCMember.updateOne({
        $pull: {
          clubs: req.params.id,
        },
      })
    }
    return res.status(200).json('Left club group!')
  } else if (club.clubAdmin.includes(req.user.id) || req.user.isAdmin) {
    console.log(club.clubAdmin.includes(req.user.id))

    if (club.clubAdmin.length < 2) {
          console.log('zzz')
      if (req.body.clubAdmin) {
        const clubAdmiUpdated1 = await Club.updateOne({
          $push: {
            clubAdmin: req.body.clubAdmin,
          },
        })
        const clubAdmiUpdated2 = await Club.updateOne({
          $pull: {
            clubAdmin: req.user.id,
            clubMembers: req.body.clubAdmin,
          },
        })
        const userCMember = await User.findById(req.user.id)
        const userSAdmin = await User.findById(req.body.clubAdmin)
        if (userCMember) {
          const clubAdmintoUserUpdated1 = await userCMember.updateOne({
            $pull: {
              clubs: req.params.id,
            },
          })
        }
        if (userSAdmin) {
          const clubAdmintoUserUpdated2 = await userSAdmin.updateOne({
            $pull: {
              clubs: req.body.clubAdmin,
            },
          })
        }
        return res.status(200).json('admin updated')
      } else {
        return res.status(200).json('club group needs an admin')
      }
    } else {
      console.log('>>>2')
      // if (req.body.clubAdmin || req.user.isAdmin){
      console.log(req.user.id)
      if (club.clubAdmin.includes(req.user.id)) {
            console.log('zzz')
        const clubAminUpdated = await club.updateOne({
          $pull: {
            clubAdmin: req.user.id,
          },
        })
        const userCAdmin = await User.findById(req.user.id)
        if (userCAdmin) {
          const clubAdmintoUserUpdated2 = await userCAdmin.updateOne({
            $pull: {
              clubs: req.user.id,
            },
          })
        }
        return res.status(200).json('Left club')
      } else if (club.clubMembers.includes(req.user.id)){
        const clubMembersUpdated = await club.updateOne({
          $pull: {
            clubMembers: req.user.id,
          },
        })
        const userCMember = await User.findById(req.user.id)
        if (userCMember) {
          const clubMembersToUser = await userCMember.updateOne({
            $pull: {
              clubs: req.user.id,
            },
          })
        }
        return res.status(200).json('Left club')
    }  else {
        return res.status(200).json('You are not apart of this club group!')
      }
    }
  }
  console.log({ leave: club })
})

module.exports = router
