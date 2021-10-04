const router = require('express').Router()
const User = require('../models/User')
const Uni = require('../models/Uni')
const Post = require('../models/Post')
const verify = require('./verify')
const bcrypt = require('bcrypt')
// Get Uni
// http://localhost:5000/api/unis/:uniName
<<<<<<< HEAD
router.get('/:uniName', verify, async (req, res) => {
  try {
    const uniName = await Uni.findOne({ uniName: req.params.uniName })
    console.log(req.user.id)
    console.log(uniName)
    console.log({ uniadmin: uniName.uniAdmin })
    if (!uniName) {
      const uniId = await Uni.findById(req.params.uniName)
      try {
        const { updatedAt, ...other } = uniId._doc
        res.status(200).json(other)
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      try {
        const { updatedAt, ...other } = uniName._doc
        res.status(200).json(other)
      } catch (err) {
        res.status(500).json(err)
      }
    }
  } catch (err) {
    return res.status(401).json('Not authenticated!')
  }
})
=======
router.get("/:uniDisplayName", verify, async (req, res) => {
  try {
    const uniDisplayName = await Uni.findOne({
      uniDisplayName: req.params.uniDisplayName
    });
    console.log(req.user.id);
    console.log({
      uniDisplayName: uniDisplayName.uniDisplayName
    });
    if (uniDisplayName) {
      try {
        const {
          updatedAt,
          ...other
        } = uniDisplayName._doc;
        res.status(200).json(other);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    return res.status(401).json("Can't find uni");
  }
});
>>>>>>> 008c1c126cd89de2a8e0fd33029d4b066df95ffa



// create Uni
// http://localhost:5000/api/unis/register
<<<<<<< HEAD
router.post('/register', verify, (req, res) => {
  try {
    Uni.findOne({ uniName: req.body.uniName }).then((uni) => {
      if (uni) {
        // backend error stuff
        let errors = {}
        if (uni.uniName === req.body.uniName || uni.email === req.body.email) {
          errors.uniName = 'Uni or email already exists'
        }
        console.log({ errors: errors })
        return res.status(500).json(errors)
      } else {
        const newUni = new Uni({
          uniName: req.body.uniName.replaceAll(/\s/g, ''),
          email: req.body.email,
          uniAdmin: req.user.id,
        })

        newUni.save()

        return res.status(200).json(newUni)
      }

      // need to update user
    })
  } catch (err) {
    return res.status(500).json({
      error: err,
    })
  }
})
=======
router.post("/register", verify, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      console.log({
        errors: "Admin only!"
      });
      return res.status(422).json({
        error: "Admin only!"
      });
    } else {
      if (!req.body.uniName || !req.body.email) {
        console.log({
          errors: "uniName or email field is required"
        });
        return res.status(422).json({
          error: "uniName or email field is required"
        });
      } else {
        // find email or username
        const uniDisplayName = req.body.uniName;
        const uni = await Uni.findOne({

uniName: req.body.uniName
});
  console.log(uni);
        if (uni) {
          // backend error stuff
          console.log(uni.email);
          let errors = {};
          if (uni.email === req.body.email) {
            errors.email = "Email already exists";
          }
          if (uniDisplayName === uni.uniDisplayName) {
            errors.uniName = "Uni name already exists";
          }



          console.log({
            errors: errors
          });
          return res.status(403).json(errors);

        } else {
          const uniDisplayName = req.body.uniName.replace(/\s+/g, '');
          // const newUni = new Uni({req.body},  uniDisplayName: uniDisplayName,);

          const newUni = new Uni({
            uniName: req.body.uniName,
            uniDisplayName: uniDisplayName,
            email: req.body.email,
            uniAdmin: req.user.id
          });
          // //
          const savedUni = await newUni.save();
          // console.log();
          return res.status(200).json(savedUni);
          console.log(savedUni);
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
    res.status(500).json(err);
  }
});



>>>>>>> 008c1c126cd89de2a8e0fd33029d4b066df95ffa

//Update User
// https://reqbin.com/
// put--> http://localhost:5000/api/unis/:uniName
<<<<<<< HEAD
router.put('/:uniName', verify, async (req, res) => {
  const uniName = await Uni.findOne({ uniName: req.params.uniName })
  console.log({ userid: req.user.id })
  console.log({ uniId: uniName._id })
  console.log({ uniadmin: uniName.uniAdmin })
  if (uniName.uniAdmin.includes(req.user.id) || req.user.isAdmin) {
    if (req.body.uniAdmin !== req.user.id) {
      const updatedUniAdmin = await uniName.updateOne({
        $push: { uniAdmin: req.body.uniAdmin },
      })
      const { uniAdmin, ...other } = req.body
      const updatedUni = await uniName.updateOne({ $set: other })
      return res.status(200).json(req.body)
    } else {
      const { uniAdmin, ...other } = req.body
      const updatedUni = await uniName.updateOne({ $set: other })
      return res.status(200).json(req.body)
    }
  } else {
    return res.status(401).json('Not authenticated!')
  }
})
=======
router.put("/:uniName", verify, async (req, res) => {

  const uniName = await Uni.findOne({
    uniName: req.params.uniName
  });
  console.log({
    userid: req.user.id
  });
  console.log({
    uniId: uniName._id
  });
  console.log({
    uniadmin: uniName.uniAdmin
  });
  if (uniName.uniAdmin.includes(req.user.id) || req.user.isAdmin) {
    if (req.body.uniAdmin !== req.user.id) {
      const updatedUniAdmin = await uniName.updateOne({
        $push: {
          uniAdmin: req.body.uniAdmin
        }
      });
      const {
        uniAdmin,
        ...other
      } = req.body;
      const updatedUni = await uniName.updateOne({
        $set: other
      });
      return res.status(200).json(req.body);
    } else {
      const {
        uniAdmin,
        ...other
      } = req.body;
      const updatedUni = await uniName.updateOne({
        $set: other
      });
      return res.status(200).json(req.body);
    }

  } else {
    return res.status(401).json("Not authenticated!");
  }
});
>>>>>>> 008c1c126cd89de2a8e0fd33029d4b066df95ffa

// Delete Unis
// https://reqbin.com/
// delete--> http://localhost:5000/api/unis/:uniName
<<<<<<< HEAD
router.delete('/:uniName', verify, async (req, res) => {
  const uniName = await Uni.findOne({ uniName: req.params.uniName })
  if (uniName) {
    console.log({ userid: req.user.id })
    console.log({ uniId: uniName._id })
    console.log({ uniadmin: uniName.uniAdmin })
    if (uniName.uniAdmin.includes(req.user.id) || req.user.isAdmin) {
      await Post.deleteMany({ userId: uniName._id })
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
=======
router.delete("/:uniName", verify, async (req, res) => {
  const uniName = await Uni.findOne({
    uniName: req.params.uniName
  });
  if (uniName) {
    console.log({
      userid: req.user.id
    });
    console.log({
      uniId: uniName._id
    });
    console.log({
      uniadmin: uniName.uniAdmin
    });
    if (uniName.uniAdmin.includes(req.user.id) || req.user.isAdmin) {
      await Post.deleteMany({
        userId: uniName._id
      });
      await User.findByIdAndDelete(uniName._id);
      res.status(200).json("Uni deleted!");
    } else {
      return res.status(401).json("Not authenticated!");
    }
  } else {
    res.status(404).json("Uni not found");
  }
});
module.exports = router;
>>>>>>> 008c1c126cd89de2a8e0fd33029d4b066df95ffa
