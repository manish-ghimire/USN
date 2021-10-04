const router = require('express').Router()
const User = require('../models/User')
const Uni = require('../models/Uni')
const Post = require('../models/Post')
const verify = require('./verify')
const bcrypt = require('bcrypt')
// Get Uni
// http://localhost:5000/api/unis/:uniName
router.get('/:uniDisplayName', verify, async (req, res) => {
  try {
    const uniDisplayName = await Uni.findOne({
      uniDisplayName: req.params.uniDisplayName,
    })
    console.log(req.user.id)
    console.log({
      uniDisplayName: uniDisplayName.uniDisplayName,
    })
    if (uniDisplayName) {
      try {
        const { updatedAt, ...other } = uniDisplayName._doc
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

// create Uni
// http://localhost:5000/api/unis/register
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
        // find email or username
        // console.log(req.body.uniName.replace(/\s+/g, ''));
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
          // const newUni = new Uni({req.body},  uniDisplayName: uniDisplayName,);
          console.log(
            { uniDisplayName },
            { uniname: req.body.uniName },
            { email: req.body.email },
            { id: req.user.id }
          )
          // const newUni = new Uni({
          //   uniName: req.body.uniName,
          //   uniDisplayName: uniDisplayName,
          //   email: req.body.email,
          //   uniAdmin: req.user.id
          // });

          const newUni = new Uni({
            uniName: req.body.uniName,
            uniDisplayName: uniDisplayName,
            email: req.body.email,
            uniAdmin: req.user.id,
          })
          // //
          // console.log(newUni);
          const savedUni = await newUni.save()

          return res.status(200).json(savedUni)
          console.log(savedUni)
        }
      }
      // else {
      // const uniDisplayName = req.body.uniName.replace(/\s+/g, '');
      // const newUni =  new Uni({
      //                uniName: req.body.uniName,
      //                uniDisplayName: uniDisplayName,
      //                email: req.body.email,
      //                uniAdmin: req.user.id
      //            });
      // //
      //                              newUni.save();
      // // console.log( newUni);
      //          return res.status(200).json(newUni);
      //          console.log("here");
      //        }

      // .then((uni) => {
      //          if (uni) {
      //            const uniName = req.body.uniName;
      //            // backend error stuff
      //              console.log({"test111": uniNamez});
      //              let errors = {};
      //              if (uni.uniDisplayName === uniName.replaceAll(/\s/g,'')) {
      //                  errors.uniName = "Uni name already exists";
      //              }
      //              if (uni.email === req.body.email){
      //                  errors.email = "";
      //              }
      //              console.log({errors:errors});
      //              return res.status(500).json(errors);
      //
      //          } else {
      //            console.log({"here":req.body.uniName})
      //              const uniDisplayName = req.body.uniName.replaceAll(/\s/g,'');
      //
      //            const newUni = new Uni({
      //                           uniName: req.body.uniName,
      //                           uniDisplayName: uniDisplayName,
      //                           email: req.body.email,
      //                           uniAdmin: req.user.id
      //                       });
      //
      //                              newUni.save();
      //
      //                     return res.status(200).json(newUni);
      //
      //                   }
      //      }).catch((err) => {
      //          return res.status(500).json({
      //              error: err
      //          });
      //      });
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//Update User
// https://reqbin.com/
// put--> http://localhost:5000/api/unis/:uniName
router.put('/:uniDisplayName', verify, async (req, res) => {
  const uniName = await Uni.findOne({
    uniDisplayName: req.params.uniDisplayName,
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

// Delete Unis
// https://reqbin.com/
// delete--> http://localhost:5000/api/unis/:uniName
router.delete('/:uniDisplayName', verify, async (req, res) => {
  const uniName = await Uni.findOne({
    uniDisplayName: req.params.uniDisplayName,
  })
  if (uniName) {
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
      await Post.deleteMany({
        userId: uniName._id,
      })
      await User.findByIdAndDelete(uniName._id)
      res.status(200).json('Uni deleted!')
    } else {
      return res.status(401).json('Not authenticated!')
    }
  } else {
    res.status(404).json('Uni not found')
  }
})
module.exports = router
