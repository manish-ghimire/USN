const router = require("express").Router();
const Conversation = require("../models/Conversation");
const verify = require("./verify");


//New conversation
// http://localhost:5000/api/conversation/
router.post("/", verify, async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
});

// Get conversation
router.get("/:userId", verify, async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: {$in: [req.params.userId]},
    })
    if(conversation){
    res.status(200).json(conversation);
  }else{
      res.status(404).json("conversation not found!");
  }
  }
  catch (err) {
    res.status(404).json("conversation not found");
  }
});
router.get("/find/:firstUserId/:secondUserId", verify, async (req, res) => {
  // try {
    const conversation = await Conversation.findOne({
      members: {$all: [req.params.firstUserId, req.params.secondUserId]},
    })
    res.status(200).json(conversation);
  // }
  // catch (err) {
  //   res.status(500).json(err);
  // }
});
module.exports = router;
