const router = require('express').Router()
const User = require('../models/User')
const Uni = require('../models/Uni')
const Club = require('../models/Club')
const Post = require('../models/Post')
const Course = require('../models/Course')
const Faculty = require('../models/Faculty')
const verify = require('./verify')

//CREATE
router.post('/register', verify, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      console.log({
        errors: 'Admin only!',
      })
      return res.status(422).json({
        error: 'Admin only!',
      })
    } else {
      if (!req.body.uniName || !req.body.email) {
        console.log({
          errors: 'uniName or email field is required',
        })
        return res.status(422).json({
          error: 'uniName or email field is required',
        })
      } else {
        const uniDisplayName = req.body.uniName.replace(/\s+/g, '')

        const uni = await Uni.findOne({
          uniDisplayName: uniDisplayName,
        })

        if (uni) {
          // backend error stuff
          let errors = {}
          if (uni.email === req.body.email) {
            errors.email = 'Email already exists'
          }
          if (uniDisplayName === uni.uniDisplayName) {
            errors.uniName = 'Uni name already exists'
          }

          console.log({
            errors: errors,
          })
          return res.status(403).json(errors)
        } else {
          console.log({ uniName: req.body.uniName })

          const uniDisplayName = await req.body.uniName.replace(/\s+/g, '')
          console.log(
            { uniDisplayName },
            { uniname: req.body.uniName },
            { email: req.body.email },
            { id: req.user.id }
          )

          const newUni = new Uni({
            uniName: req.body.uniName,
            uniDisplayName: uniDisplayName,
            email: req.body.email,
            uniAdmin: req.user.id,
          })
          const savedUni = await newUni.save()

          return res.status(200).json(savedUni)
          console.log(savedUni)
        }
      }
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// READ and READ ALL
router.get('/:uniId', verify, async (req, res) => {
  // try {
  const uniId = await Uni.findOne({
    uniDisplayName: req.params.uniId,
  })
  if (!uniId) {
    const uniId = await Uni.findOne({
      _id: req.params.uniId,
    })
    console.log()
    try {
      const { updatedAt, ...other } = uniId._doc
      res.status(200).json(other)
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    try {
      const { updatedAt, ...other } = uniId._doc
      res.status(200).json(other)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  // } catch (err) {
  //   return res.status(401).json("Can't find uni")
  // }
})

router.get('/', verify, async (req, res) => {
  try {
    const uni = await Uni.find()
    res.status(200).json(uni)
  } catch (err) {
    return res.status(401).json("Can't find uni")
  }
})

//UPDATE
router.put('/:id', verify, async (req, res) => {
  const uniName = await Uni.findOne({
    _id: req.params.id,
  })
  if (uniName.uniAdmin.includes(req.user.id) || req.user.isAdmin) {
    if (req.body.uniAdmin !== req.user.id) {
      const updatedUniAdmin = await uniName.updateOne({
        $push: {
          uniAdmin: req.body.uniAdmin,
        },
      })
      const { uniAdmin, ...other } = req.body
      const updatedUni = await uniName.updateOne({
        $set: other,
      })
      return res.status(200).json(req.body)
    } else {
      const { uniAdmin, ...other } = req.body
      const updatedUni = await uniName.updateOne({
        $set: other,
      })
      return res.status(200).json(req.body)
    }
  } else {
    return res.status(401).json('Not authenticated!')
  }
})

//DELETE
router.delete('/:id', verify, async (req, res) => {
  const uniName = await Uni.findOne({
    _id: req.params.id,
  })
  if (uniName) {
    if (uniName.uniAdmin.includes(req.user.id) || req.user.isAdmin) {
      await Post.deleteMany({
        userId: uniName._id,
      })
      await Uni.findByIdAndDelete(uniName._id)
      res.status(200).json('Uni deleted!')
    } else {
      return res.status(401).json('Not authenticated!')
    }
  } else {
    res.status(404).json('Uni not found')
  }
})

// ******************************************************

router.get('/:uniId/clubs', verify, async (req, res) => {
  const uniId = await Uni.findOne({
    uniDisplayName: req.params.uniId,
  })
  if (!uniId) {
    const uniId = await Uni.findOne({
      _id: req.params.uniId,
    })
    console.log(uniId._id)
    console.log('finduniclubs')
    const club = await Club.find({ uniId: uniId._id })
    if (club) {
      res.status(200).json(club)
      console.log(club)
    }
  } else {
    const club = await Club.find({ uniId: uniId._id })
    if (club) {
      res.status(200).json(club)
      console.log(club)
    }
  }
})

router.get('/:uniId/faculty', verify, async (req, res) => {
  // try {
  const uniId = await Uni.findOne({
    uniDisplayName: req.params.uniId,
  })
  if (!uniId) {
    const uniId = await Uni.findOne({
      _id: req.params.uniId,
    })
    console.log(uniId)
    // try {
    const faculty = await Faculty.find({
      uniId: {
        $in: [req.params.uniId],
      },
    })
    res.status(200).json(faculty)
    // } catch (err) {
    //   res.status(500).json(err)
    // }
  } else {
    try {
      const faculty = await Faculty.find({
        uniId: {
          $in: [uniId._id],
        },
      })
      res.status(200).json(faculty)
      console.log()
    } catch (err) {
      res.status(500).json(err)
    }
  }
  // } catch (err) {
  //   return res.status(401).json("Can't find uni")
  // }
})

router.get('/:uniId/course', verify, async (req, res) => {
  // try {
  const uniId = await Uni.findOne({
    uniDisplayName: req.params.uniId,
  })
  if (!uniId) {
    const uniId = await Uni.findOne({
      _id: req.params.uniId,
    })
    // console.log(uniId);
    const faculty = await Faculty.find({
      uniId: {
        $in: [req.params.uniId],
      },
    })

    let fac = []
    console.log(faculty)
    console.log(faculty.length)
    for (var i = 0; i < faculty.length; i++) {
      const ids = faculty[i]._id
      const cc = await Course.find({
        facultyId: {
          $in: [ids],
        },
      })
      console.log(cc)
      res.status(200).json(cc)
    }
  } else {
    // try {
    const faculty = await Faculty.find({
      uniId: {
        $in: [uniId._id],
      },
    })

    let fac = []
    console.log(faculty)
    console.log(faculty.length)
    for (var i = 0; i < faculty.length; i++) {
      const ids = faculty[i]._id
      const cc = await Course.find({
        facultyId: {
          $in: [ids],
        },
      })
      console.log(cc)
      res.status(200).json(cc)
    }
    console.log('not here')
    // } catch (err) {
    //   res.status(500).json(err)
    // }
  }
  // } catch (err) {
  //   return res.status(401).json("Can't find uni")
  // }
})

module.exports = router
