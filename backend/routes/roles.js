const router = require("express").Router();
const Role = require("../models/Role");
const User = require("../models/User");
const verify = require("./verify");

router.post("/", verify, async (req, res) => {
  const newRole = new Role(req.body);
  try{
    const savedRole = await newRole.save();
    res.status(200).json(savedRole);
  }
  catch(err){
    res.status(500).json(err);
  }

});

module.exports = router;
