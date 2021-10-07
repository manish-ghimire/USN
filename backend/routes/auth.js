const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verify = require('./verify')
//Register
// https://reqbin.com/
// post--> http://localhost:5000/api/auth/register
router.post('/register', async (req, res) => {
  try {
    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.password ||
      req.body.password.length < 6
    ) {
      console.log({
        errors: 'All fields are required or password length is less then 6',
      })
      return res
        .status(422)
        .json({
          error: 'All fields are required or password length is less then 6',
        })
    } else {
      // find email or username
      const user = await User.findOne({
        $or: [
          {
            email: req.body.email,
          },
          {
            username: req.body.username,
          },
        ],
      })
      if (user) {
        // backend error stuff
        let errors = {}
        if (user.username === req.body.username) {
          errors.username = 'Username already exists'
        }
        if (user.email === req.body.email) {
          errors.email = 'Email already exists'
        }
        console.log({ errors: errors })
        return res.status(500).json(errors)
      } else {
        // fetch user from body
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        })
        // hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            // save newU user
            newUser
              .save()
              .then((user) => res.status(200).json(user))
              .catch((err) => console.log(err))
          })
        })
      }
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//Login
// https://reqbin.com/
// post--> http://localhost:5000/api/auth/login
// store refresh token in mongodb
let refreshTokens = []
router.post('/login', (req, res) => {
  try {
    // check if username or email
    if (req.body.username.indexOf('@') > -1) {
      console.log('@here')
      // email login stuff
      User.findOne({ email: req.body.username }).then((validUser) => {
        if (!validUser) {
          console.log('Invalid Credentials')
          res.status(500).json('Invalid Credentials')
        } else {
          try {
            bcrypt
              .compare(req.body.password, validUser.password)
              .then((validPassword) => {
                if (validPassword) {
                  console.log('workingemail')
                  const { password, ...user } = validUser._doc
                  // token stuff
                  const accessToken = jwt.sign(
                    { id: validUser.id, isAdmin: validUser.isAdmin },
                    'mySecretKey',
                    { expiresIn: '1d' }
                  )
                  const refreshToken = jwt.sign(
                    { id: validUser.id, isAdmin: validUser.isAdmin },
                    'myRefreshSecretKey'
                  )
                  refreshTokens.push(refreshToken)
                  res.status(200).json({ user, accessToken, refreshToken })
                } else {
                  console.log('Invalid Credentials')
                  res.status(500).json('Invalid Credentials')
                }
              })
          } catch (err) {
            res.status(500).json(err)
          }
        }
      })
    } else {
      // username login stuff
      console.log('no@')
      User.findOne({ username: req.body.username }).then((validUser) => {
        if (!validUser) {
          console.log('Invalid Credentials')
          res.status(500).json('Invalid Credentials')
        } else {
          try {
            bcrypt
              .compare(req.body.password, validUser.password)
              .then((validPassword) => {
                if (validPassword) {
                  console.log('workingusername')
                  const { password, ...user } = validUser._doc
                  //  access token
                  const accessToken = jwt.sign(
                    { id: validUser.id, isAdmin: validUser.isAdmin },
                    'mySecretKey',
                    { expiresIn: '1d' }
                  )
                  const refreshToken = jwt.sign(
                    { id: validUser.id, isAdmin: validUser.isAdmin },
                    'myRefreshSecretKey'
                  )
                  refreshTokens.push(refreshToken)
                  res.status(200).json({ user, accessToken, refreshToken })
                } else {
                  console.log('Invalid Credentials')
                  res.status(500).json('Invalid Credentials')
                }
              })
          } catch (err) {
            res.status(500).json(err)
          }
        }
      })
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// const verify = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader){
//     const token = authHeader.split(" ")[1];
//     // console.log(token);
//     jwt.verify(token, "mySecretKey", (err, user) => {
//       if (err){
//         return res.status(403).json("Token is not valid");
//       }
//       req.user = user;
//       next();
//     });
//   }
//   else{
//     res.status(401).json("Not authenticated!");
//   }
// }
// // Delete User
// // https://reqbin.com/
// // http://localhost:5000/api/auth/users/:userId/
// router.delete("/users/:userId", verify, (req, res) => {
// if (req.user.userid == req.params.userId){
//   res.status(200).json("user has been deleted");
// }else{
//   res.status(403).json("you are not allowed");
// }
// });

// refresh token
// https://reqbin.com/
// http://localhost:5000/api/auth/refresh/

router.post('/refresh', verify, (req, res) => {
  const refreshToken = req.body.token

  if (!refreshToken) {
    return res.status(401).json('Not authenticated!')
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json('Not valid token!')
  }
  jwt.verify(refreshToken, 'myRefreshSecretKey', (err, user) => {
    console.log(err)
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)

    const newAccessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      'mySecretKey',
      { expiresIn: '1d' }
    )
    const newRefreshToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      'myRefreshSecretKey',
      { expiresIn: '1d' }
    )

    refreshTokens.push(newRefreshToken)

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    })
  })
})

router.post('/logout', verify, (req, res) => {
  // const refreshToken = req.body.token;
  // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json('Logged Out Success!')
})

module.exports = router
