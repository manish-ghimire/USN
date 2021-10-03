const router = require("express").Router();
const Role = require("../models/Role");
const User = require("../models/User");
const verify = require("./verify");

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin){
  const newRole = await Role.updateOne({ $push: { role: req.body } });
  try{
    const savedRole = await newRole.save();
    res.status(200).json(savedRole);
  }
  catch(err){
    res.status(500).json(err);
  }
}else{
  res.status(403).json("unauthorised");
}
});

module.exports = router;
