const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors);

port = 3000;

const DB_URI = "mongodb://localhost:27017/twitterClone";
mongoose.connect(DB_URI);

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

app.post("/register", async (req, res) => {
  console.log("/register called");
  try {
    const hashedPass = bcrypt.hashSync(User.req.password, 8);
    const user = new User({
      username: req.body.username,
      password: hashedPass,
    });

    await user.save();
    res.status(201).send("User Successfully registered");
  } catch {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Using port number ${port}`);
});
