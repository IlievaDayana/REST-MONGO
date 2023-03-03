const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
// get config vars
dotenv.config();
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://user1992:greEnland199283@cluster0.qhil7yp.mongodb.net/shop?retryWrites=true&w=majority";
// const allowHeaders = require("./utils/allow-headers");
const { getFeed, postFeed, editFeed, getPost } = require("./controllers/feed");
const { signUp, login } = require("./controllers/auth");
const cors = require("cors");
const app = express();
const port = 3001;
// Add headers before the routes are defined
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/posts", getFeed);
app.get("/posts/:postId", getPost);
app.post(
  "/sign-up",
  body("password").isLength({ min: 6 }),
  body("email").isEmail(),
  signUp
);

app.post(
  "/login",
  body("password").isLength({ min: 6 }),
  body("email").isEmail(),
  login
);

app.post(
  "/posts",
  body("title").isString().isLength({ min: 5 }),
  body("content").isString().isLength({ min: 5 }),
  body("image").isString().isLength({ min: 5 }),
  body("creator").isString().isLength({ min: 5 }),
  postFeed
);
app.options("/posts/:postId", cors());
app.post("/posts/:postId", editFeed);
mongoose.connect(MONGODB_URI).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
