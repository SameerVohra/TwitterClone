const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors);

port = 3001;

const DB_URI = "mongodb://127.0.0.1:27017/twitterClone";

mongoose.connect(DB_URI);

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

app.get("/", async (req, res) => {
  console.log("Hello");
  res.json("hhhh");
});
app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, "YOUR_SECRET_KEY");
      res.json({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Error during login");
  }
});

const PostSchema = new mongoose.Schema({
  usetId: mongoose.Schema.Types.ObjectId,
  title: String,
  const: String,
});

const Post = mongoose.model("Post", PostSchema);

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(403).send("A token is required for authentication");
  try {
    req.user = jwt.verify(token.split(" ")[1], "YOUR_SECRET_KEY"); // Split to remove 'Bearer'
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}

app.get("/posts", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error fetching posts");
  }
});

app.get("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    return res.status(404).send("Post not found");
  }
});

app.put("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.postId,
      userId: req.user.userId,
    });
    if (!post) return res.status(404).send("Post not found or unauthorized");
    post.title = req.body.title;
    post.content = req.body.content;
    await post.save();
    res.status(200).send("Post updated successfully");
  } catch (error) {
    res.status(500).send("Error updating post");
  }
});

app.delete("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const result = await Post.findOneAndDelete({
      _id: req.params.postId,
      userId: req.user.userId,
    });
    if (!result) {
      return res.status(404).send("Post not found or unauthorized");
    }
    res.status(200).send("Post deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting post");
  }
});

app.listen(port, () => {
  console.log(`Using port number ${port}`);
});
