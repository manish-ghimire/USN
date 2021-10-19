const router = require("express").Router();
const Role = require("../models/Role");
const User = require("../models/User");
const verify = require("./verify");

router.put("/", verify, async (req, res) => {
  if (req.user.isAdmin){
    try{
          if(req.body.role){
  const role = await Role.findOne({roles: req.body.role});
  // console.log(role.roles.includes(req.body.role));
  if (!role){

const updateRole = await Role.updateOne({ $push: { roles: req.body.role } });
    res.status(200).json("Roles updated");


}else{
  res.status(403).json("role already exists");
}
}else{
        return res.status(401).json("Can't find role");
}
}
catch(err){
  res.status(500).json(err);
}
}
else{
  res.status(401).json("Unauthorised!");
}

});

router.get("/", verify, async (req, res) => {
  // if (req.user.isAdmin){
  try {
  // const  dbRolesId = "6159a45cdc7ce0db11feea7d";
  const roles = await Role.find();
    // console.log(roles);
    return res.status(200).json(roles);
  } catch (err) {
    return res.status(401).json("Can't find role");
  }
// }else{
//   res.status(401).json("Unauthorised!");
// }
});

router.delete("/", verify, async (req, res) => {
    if (req.user.isAdmin){
  try {
    if(req.body.role){
    const roles = await Role.find();
await roles.updateOne({ $pull: { roles: req.body.role } });
  return res.status(200).json("roles has been deleted");
}else{
  return res.status(401).json("Can't find");
}
  } catch (err) {
    return res.status(401).json("Can't delete");
  }
}else{
  res.status(401).json("Unauthorised!");
}
});

module.exports = router;
