const router = require('express').Router()
const User = require('../models/User')
const Uni = require('../models/Uni')
const Club = require('../models/Club')
const Post = require('../models/Post')
const verify = require('./verify')

//localhost:5000/api/uni

router.get('/:uniId', verify, async (req, res) => {
  try {
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
  } catch (err) {
    return res.status(401).json("Can't find uni")
  }
})

router.get('/', verify, async (req, res) => {
  try {
    const uni = await Uni.find()
    res.status(200).json(uni)
  } catch (err) {
    return res.status(401).json("Can't find uni")
  }
})

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

router.put('/:id', verify, async (req, res) => {
  const uniName = await Uni.findOne({
    _id: req.params.id,
  })
  console.log({
    userid: req.user.id,
  })
  console.log({
    uniId: uniName._id,
  })
  console.log({
    uniadmin: uniName.uniAdmin,
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

router.get('/:uniDisplayName/find', verify, async (req, res) => {
  const uniName = await Uni.findOne({
    uniDisplayName: req.params.uniDisplayName,
  })
  console.log(uniName._id)
  console.log('finduniclubs')
  if (uniName) {
    const club = await Club.find({ clubToUni: uniName._id })
    if (club) {
      res.status(200).json(club)
      console.log(club)
    }
  }
})

module.exports = router
