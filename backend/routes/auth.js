const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
// https://reqbin.com/
// post--> http://localhost:5000/api/auth/register
router.post("/register", (req, res) => {
  try {
    // find email or username
    User.findOne({
            $or: [{
                email: req.body.email
            }, {
                username: req.body.username
            }]
        }).then(user => {
            if (user) {
              // backend error stuff
                let errors = {};
                if (user.username === req.body.username) {
                    errors.username = "Username already exists";
                }
                if (user.email === req.body.email) {
                    errors.email = "Email already exists";
                }
                console.log({errors:errors});
                return res.status(500).json(errors);

            } else {
              // fetch user from body
              const newUser = new User({
                             username: req.body.username,
                             email: req.body.email,
                             password: req.body.password
                         });
                         // hash password
                         bcrypt.genSalt(10, (err, salt) => {
                             bcrypt.hash(newUser.password, salt, (err, hash) => {
                                 if (err) throw err;
                                 newUser.password = hash;
                                 // save newU user
                                 newUser.save().then(
                                   (user) => res.json(user)
                                 ).catch((err) => console.log(err));
                             });
                         });
                     }
        })
        .catch((err) => {
            return res.status(500).json({
                error: err
            });
        });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
// https://reqbin.com/
// post--> http://localhost:5000/api/auth/login
router.post("/login", (req, res) => {
  try {
    // check if username or email
    if (req.body.username.indexOf('@') > -1) {
      console.log("@here");
      // email login stuff
     User.findOne({ email: req.body.username }).then((validUser) => {
        if(!validUser){
                console.log("Invalid Credentials");
              res.status(500).json("Invalid Credentials");
        }else{
        try{
        bcrypt.compare(req.body.password, validUser.password).then((validPassword) => {
          if(validPassword){
              console.log("workingemail");
              const { password, ...others } = validUser._doc;
              res.status(200).json(others);
          }
          else {
                      console.log("Invalid Credentials");
              res.status(500).json("Invalid Credentials");
          }
        });
      }
        catch (err){
          res.status(500).json(err);
        }
      }
      });
    }else{
      // username login stuff
            console.log("no@");
    User.findOne({ username: req.body.username }).then((validUser) => {
        if(!validUser){
            console.log("Invalid Credentials");
              res.status(500).json("Invalid Credentials");
        }else{
        try{
        bcrypt.compare(req.body.password, validUser.password).then((validPassword) => {
          if(validPassword){
            console.log("workingusername");
            const { password, ...others } = validUser._doc;
            res.status(200).json(others);

          }else {
              console.log("Invalid Credentials");
              res.status(500).json("Invalid Credentials");
          }
        });
    }
      catch (err){
        res.status(500).json(err);
      }
    }
      });
    }
  } catch (err) {
    res.status(500).json(err)
  }
});


module.exports = router;
