const router = require("express").Router();
const Conversation = require("../models/Conversation");
const verify = require("./verify");


//New conversation
// http://localhost:5000/api/conversation/
router.post("/", verify, async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  if (!newConversation){
  res.status(422).json({error: "Conversation is empty!!"});
}else{
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  }
  catch (err) {
    res.status(500).json(err);
  }
}
});

// Get conversation
router.get("/:id", verify, async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: {$in: [req.params.id]},
    })
    res.status(200).json(conversation);
  }
  catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
