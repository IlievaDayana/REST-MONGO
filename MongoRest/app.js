const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://user1992:greEnland199283@cluster0.qhil7yp.mongodb.net/shop?retryWrites=true&w=majority";
const allowHeaders = require("./utils/allow-headers");
const { getFeed, postFeed } = require("./controllers/feed");
const app = express();
const port = 3000;
app.use(bodyParser.json());

// Add headers before the routes are defined
app.use(allowHeaders);

app.get("/posts", getFeed);

app.post(
  "/posts",
  body("title").isString().isLength({ min: 5 }),
  body("content").isString().isLength({ min: 5 }),
  body("image").isString().isLength({ min: 5 }),
  body("creator").isString().isLength({ min: 5 }),
  postFeed
);

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
