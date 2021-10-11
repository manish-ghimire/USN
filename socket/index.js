const io = require("socket.io")(4000, {
  cors: {
    origin: "http://localhost:3000",
    // origin: "https://usn-test.herokuapp.com/"
  },
});

let users = [];
console.log("users1", users)
const addUser = (userId, socketId) => {
  console.log("userIad",  !users.some((user) => user.userId === userId))
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  console.log("eremove", users)
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
// const getUser = (userId) => {
//   console.log("userIdz", userId)
//   console.log('check',users.find((user) => user.userid === userId))
//   return users.find((user) => user.userid === userId)
//
//
// };
console.log("users2", users)
io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
