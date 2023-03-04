const { validationResult } = require("express-validator");
const { Feed } = require("../models/feed");
const { errorHandler } = require("../utils/errorHandler");

exports.getFeed = (req, res) => {
  Feed.find().then((data) => {
    return res
      .status(200)
      .send(JSON.stringify({ posts: data, totalPosts: data.length }));
  });
};

exports.postFeed = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed!", errors: errors.array() });
  }
  if (!req.file) {
    const error = new Error("no file is uploaded");
    error.statusCode = 422;
    throw error;
  }
  console.log(req.body);
  Feed.create(req.body)
    .then((response) => {
      res.status(201).send(JSON.stringify(response));
      next();
    })
    .catch((err) => errorHandler(err, next));
};

exports.getPost = (req, res, next) => {
  const { postId } = req.params;
  Feed.findOne({ _id: postId })
    .then((response) => {
      if (!response) {
        const error = new Error("no post found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).send(JSON.stringify(response));
    })
    .catch((err) => errorHandler(err, next));
};

exports.editFeed = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed!", errors: errors.array() });
  }
  const { postId } = req.params;
  Feed.findOneAndUpdate({ _id: postId }, req.body)
    .then((response) => {
      res.status(201).send(JSON.stringify(response));
      next();
    })
    .catch((err) => errorHandler(err, next));
};
