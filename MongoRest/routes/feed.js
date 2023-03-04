const express = require("express");
const {
  getFeed,
  getPost,
  postFeed,
  editFeed,
  deletePost,
} = require("../controllers/feed");
const router = express.Router();
const cors = require("cors");
const { body } = require("express-validator");

router.get("/posts", getFeed);
router.get("/posts/:postId", getPost);

router.post(
  "/posts",
  body("title").trim().isString().isLength({ min: 5 }),
  body("content").trim().isString().isLength({ min: 5 }),
  body("image").trim().isString().isLength({ min: 5 }),
  body("creator").trim().isString().isLength({ min: 5 }),
  postFeed
);

router.options("/posts/:postId", cors());

router.post(
  "/posts/:postId",
  body("title").trim().isString().isLength({ min: 5 }),
  body("content").trim().isString().isLength({ min: 5 }),
  body("image").trim().isString().isLength({ min: 5 }),
  body("creator").trim().isString().isLength({ min: 5 }),
  editFeed
);

router.delete("/posts/:postId", deletePost);

module.exports = router;
