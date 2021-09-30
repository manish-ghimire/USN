const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const roleRoute = require("./routes/roles");
const uniRoute = require("./routes/unis");
const jwt = require("jsonwebtoken");
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true }).then(
  console.log("Connented to mongoDB!")).catch(
    (err) => console.log(err)
  );

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/roles", roleRoute);
app.use("/api/unis", uniRoute);


app.listen(5000, () => {
  console.log('Backend is running!')
})
