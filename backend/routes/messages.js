const router = require("express").Router();
const Message = require("../models/Message");
const verify = require("./verify");

//add message
// http://localhost:5000/api/conversation/
router.post("/", verify, async (req, res) => {
  const newMessage = new Message(req.body);
  if (!newMessage){
  res.status(422).json({error: "Conversation is empty!!"});
}else{
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  }
  catch (err) {
    res.status(500).json(err);
  }
}
});

// Get messages
router.get("/:conversationId", verify, async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId : req.params.conversationId,
    });
    res.status(200).json(messages);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
