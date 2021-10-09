const router = require('express').Router()
const User = require('../models/User')
const Uni = require('../models/Uni')
const Club = require('../models/Club')
const Post = require('../models/Post')
const Course = require('../models/Course')
const Faculty = require('../models/Faculty')
const verify = require('./verify')

//localhost:5000/api/course/
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
      if (!req.body.courseName || !req.body.facultyId) {
        console.log({
          errors: 'courseName or facultyId field is required',
        })
        return res.status(422).json({
          error: 'courseName or facultyId field is required',
        })
      } else {
        const courseDisplayName = req.body.courseName.replace(/\s+/g, '')

        const course = await Course.findOne({
          courseDisplayName: courseDisplayName,
        })
console.log("course", course);
        if (course) {
          // backend error stuff
          let errors = {}
          if (courseDisplayName === course.courseDisplayName) {
            errors.courseName = 'Course name already exists'
          }

          console.log({
            errors: errors,
          })
          return res.status(403).json(errors)
        } else {
          console.log({ courseName: req.body.courseName })

          const courseDisplayName = await req.body.courseName.replace(/\s+/g, '')


          const newCourse = new Course({
            courseName: req.body.courseName,
            courseDisplayName: courseDisplayName,
            courseDesc: req.body.courseDesc,
            courseCode: req.body.courseCode,
            courseVersion: req.body.courseVersion,
            courseDuration: req.body.courseDuration,
            courseFees: req.body.courseFees,
            facultyId: req.body.facultyId,
          })
          const savedCourse = await newCourse.save()
                // const facultyId = await Uni.findById(req.body.facultyId)
                // if (facultyId) {
                //   const oneFacultyIdUpdate = await facultyId.updateOne({
                //     $push: { courseId: '' + newCourse._id + '' },
                //   })
                // }
          return res.status(200).json(savedCourse)
          console.log(savedCourse)
        }
      }
    }
  // } catch (err) {
  //   res.status(500).json(err)
  // }
})


router.get('/:id', verify, async (req, res) => {
  try {
    const courseId = await Course.findOne({
      courseDisplayName: req.params.id,
    })
    if (!courseId) {
      const courseId = await Course.findOne({
        _id: req.params.id,
      })
      console.log()
      try {
        const { updatedAt, ...other } = courseId._doc
        res.status(200).json(other)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      try {
        const { updatedAt, ...other } = courseId._doc
        res.status(200).json(other)
      } catch (err) {
        res.status(500).json(err)
      }
    }
  } catch (err) {
    return res.status(401).json("Can't find course")
  }
})

router.get('/', verify, async (req, res) => {
  try {
    const course = await Course.find()
    res.status(200).json(course)
  } catch (err) {
    return res.status(401).json("Can't find course")
  }
})


router.put('/:id', verify, async (req, res) => {
  const uniName = await Uni.findOne({
      uniAdmin: {$in : req.user.id}
  })
  if (uniName.uniAdmin.includes(req.user.id) || req.user.isAdmin) {
      const { uniAdmin, ...other } = req.body
    const courseUpdate = await Course.findByIdAndUpdate(req.params.id,
      {
              $set: other,
          courseDisplayName: other.courseName.replace(/\s+/g, '')
        },

      {
        multi: true,
        new: true,
      }
    )
      return res.status(200).json(courseUpdate)
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
      await Course.findByIdAndDelete(req.params.id)
      res.status(200).json('Course deleted!')
    } else {
      return res.status(401).json('Not authenticated!')
    }
})



module.exports = router
