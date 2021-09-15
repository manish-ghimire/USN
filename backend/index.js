const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const jwt = require("jsonwebtoken");
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true }).then(
  console.log("Connented to mongoDB!")).catch(
    (err) => console.log(err)
  );

app.use("/api/auth", authRoute);


app.listen(5000, () => {
  console.log('Backend is running!');
});
