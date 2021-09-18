const router = require("express").Router();
const User = require("../models/User");
//Update User
// https://reqbin.com/
// post--> http://localhost:5000/api/users/:id
router.put("/:id", (req, res) => {
  if (req.body.userId)

});
module.exports = router;
