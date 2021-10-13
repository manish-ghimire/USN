const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000
const PORTSOCK = process.env.PORTSOCK || 4000
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const searchRoute = require('./routes/search')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const roleRoute = require('./routes/roles')
const uniRoute = require('./routes/unis')
const studyRoute = require('./routes/studies')
const clubRoute = require('./routes/clubs')
const marketRoute = require('./routes/markets')
const conversationRoute = require('./routes/conversations')
const messageRoute = require('./routes/messages')
const commentRoute = require('./routes/comments')
const courseRoute = require('./routes/courses')
const facultyRoute = require('./routes/faculties')
const jwt = require('jsonwebtoken')
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(PORTSOCK, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true
  }
});

let users = []
console.log('users1', users)
const addUser = (userId, socketId) => {
  console.log('userIad', !users.some((user) => user.userId === userId))
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId })
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId)
  console.log('remove', users)
}

const getUser = (userId) => {
  return users.find((user) => user.userId === userId)
}

console.log('users2', users)
io.on('connection', (socket) => {
  //when ceonnect
  console.log(`a user connected ${PORTSOCK}!`)

  //take userId and socketId from user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id)
    io.emit('getUsers', users)
  })

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on('disconnect', () => {
    console.log(`a user disconnected ${PORTSOCK}!`)
    removeUser(socket.id)
    io.emit('getUsers', users)
  })
})
//*********************************************************************

dotenv.config()
app.use(express.json())
// app.get("/", (req, res) => {
//   res.json({ message: "Backend says hi!" });
// });

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Connented to mongoDB!'))
  .catch((err) => console.log(err))

app.use('/api/auth', authRoute)
app.use('/api/search', searchRoute)
app.use('/api/user', userRoute)
app.use('/api/post', postRoute)
app.use('/api/role', roleRoute)
app.use('/api/uni', uniRoute)
app.use('/api/study', studyRoute)
app.use('/api/market', marketRoute)
app.use('/api/comment', commentRoute)
app.use('/api/club', clubRoute)
app.use('/api/conversation', conversationRoute)
app.use('/api/message', messageRoute)
app.use('/api/course', courseRoute)
app.use('/api/faculty', facultyRoute)

// console.log("__dirname",__dirname)
// app.use(express.static(path.join(__dirname, "/client/build")));
//
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Backend is running on ${PORT}!`)
})
