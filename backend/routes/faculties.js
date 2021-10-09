const router = require('express').Router()
const User = require('../models/User')
const Uni = require('../models/Uni')
const Club = require('../models/Club')
const Post = require('../models/Post')
const Course = require('../models/Course')
const Faculty = require('../models/Faculty')
const verify = require('./verify')

//localhost:5000/api/uni

router.get('/:id', verify, async (req, res) => {
  console.log("1");
  try {
    const facultyId = await Faculty.findOne({
      facultyDisplayName: req.params.id,
    })
    if (!facultyId) {
      const facultyId = await Faculty.findOne({
        _id: req.params.id,
      })
      console.log()
      try {
        const { updatedAt, ...other } = facultyId._doc
        res.status(200).json(other)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      try {
        const { updatedAt, ...other } = facultyId._doc
        res.status(200).json(other)
      } catch (err) {
        res.status(500).json(err)
      }
    }
  } catch (err) {
    return res.status(401).json("Can't find faculty")
  }
})

router.get('/', verify, async (req, res) => {
  try {
    const faculty = await Faculty.find()
    res.status(200).json(faculty)
  } catch (err) {
    return res.status(401).json("Can't find faculty")
  }
})

router.post('/register', verify, async (req, res) => {
  // try {
    const uniName = await Uni.findOne({
      uniAdmin: {$in : req.user.id}
    })
    if (!req.user.isAdmin || !uniName.uniAdmin.includes(req.user.id)) {
      console.log({
        errors: 'Admin only!',
      })
      return res.status(422).json({
        error: 'Admin only!',
      })
    } else {
      if (!req.body.facultyName || !req.body.uniId) {
        console.log({
          errors: 'facultyName or uniId field is required',
        })
        return res.status(422).json({
          error: 'facultyName or uniId field is required',
        })
      } else {
        const facultyDisplayName = req.body.facultyName.replace(/\s+/g, '')

        const faculty = await Uni.findOne({
          facultyDisplayName: facultyDisplayName,
        })

        if (faculty) {
          // backend error stuff
          let errors = {}
          if (facultyDisplayName === faculty.facultyDisplayName) {
            errors.uniName = 'Faculty name already exists'
          }

          console.log({
            errors: errors,
          })
          return res.status(403).json(errors)
        } else {
          // try{
          console.log({ facultyName: req.body.facultyName })

          const facultyDisplayName = await req.body.facultyName.replace(/\s+/g, '')


          const newFaculty = new Faculty({
            facultyName: req.body.facultyName,
            facultyDisplayName: facultyDisplayName,
            facultyDesc: req.body.facultyDesc,
            uniId: req.body.uniId,
          })
          const savedFaculty = await newFaculty.save()
          const oneUni = await Uni.findById(req.body.uniId)
          if (oneUni) {
            const uniIdUpdate = await oneUni.updateOne({
              $push: { facultyId: '' + newFaculty._id + '' },
            })
          }
          return res.status(200).json(savedFaculty)
          console.log(savedFaculty)
     //    } catch (err) {
     //      res.status(500).json(err)
     //    }
      }
    }
  }

})

router.put('/:id', verify, async (req, res) => {
  const uniName = await Uni.findOne({
      uniAdmin: {$in : req.user.id}
  })
  if (uniName.uniAdmin.includes(req.user.id) || req.user.isAdmin) {
      const { uniAdmin, ...other } = req.body
      const facultyUpdate = await Faculty.findByIdAndUpdate(req.params.id,{
        $set: other,
      },{new: true})
      return res.status(200).json(facultyUpdate)
  } else {
    return res.status(401).json('Not authenticated!')
  }
})

router.delete('/:id', verify, async (req, res) => {
  const uniName = await Uni.findOne({
    uniAdmin: {$in : req.user.id}
  })
    if (uniName.uniAdmin.includes(req.user.id) || req.user.isAdmin) {
      // await Post.deleteMany({
      //   userId: uniName._id,
      // })
      await Faculty.findByIdAndDelete(req.params.id)
      res.status(200).json('Faculty deleted!')
    } else {
      return res.status(401).json('Not authenticated!')
    }
})



// ******************************************************

router.get('/:uniId/find', verify, async (req, res) => {
  const uniId = await Uni.findOne({
    uniDisplayName: req.params.uniId,
  })
  if (!uniId) {
    const uniId = await Uni.findOne({
      _id: req.params.uniId,
    })
  console.log(uniName._id)
    const club = await Club.find({ clubToUni: uniName._id })
    if (club) {
      res.status(200).json(club)
      console.log(club)
    }
  }else{
    const club = await Club.find({ clubToUni: uniName._id })
    if (club) {
      res.status(200).json(club)
      console.log(club)
    }
  }
})

module.exports = router
