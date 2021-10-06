const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const searchRoute = require("./routes/search");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const roleRoute = require("./routes/roles");
const uniRoute = require("./routes/unis");
const studyRoute = require("./routes/studies");
const clubRoute = require("./routes/clubs");
const marketRoute = require("./routes/markets");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const commentRoute = require("./routes/comments");
const jwt = require("jsonwebtoken");
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true }).then(
  console.log("Connented to mongoDB!")).catch(
    (err) => console.log(err)
  );

app.use("/api/auth", authRoute);
app.use("/api/search", searchRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/role", roleRoute);
app.use("/api/uni", uniRoute);
app.use("/api/study", studyRoute);
app.use("/api/market", marketRoute);
app.use("/api/comment", commentRoute);
app.use("/api/club", clubRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);


app.listen(5000, () => {
  console.log('Backend is running!')
})
