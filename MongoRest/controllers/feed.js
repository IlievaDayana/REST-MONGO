const { validationResult } = require("express-validator");
const { Feed } = require("../models/feed");
const { errorHandler } = require("../utils/errorHandler");
var fs = require("fs");

exports.getFeed = (req, res) => {
  Feed.find().then((data) => {
    return res
      .status(200)
      .send(JSON.stringify({ posts: data, totalPosts: data.length }));
  });
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

exports.postFeed = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed!", errors: errors.array() });
  }

  if (!req.body.image) {
    const error = new Error("no file is uploaded");
    error.statusCode = 422;
    throw error;
  }

  Feed.create(req.body)
    .then((response) => {
      res.status(201).send(JSON.stringify(response));
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
    })
    .catch((err) => errorHandler(err, next));
};

exports.deletePost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed!", errors: errors.array() });
  }
  const { postId } = req.params;

  Feed.findOneAndDelete({ _id: postId })
    .then((response) => {
      const { image } = response;
      let imageName = image.split("/").reverse()[0];
      return fs.unlink("public/my-images/" + imageName, (err) => {
        if (err) {
          throw new Error("could not delete image");
        }
        console.log("deleted succesfully");
      });
    })
    .then(() => {
      res.status(200).send(JSON.stringify({ message: "deleted successfully" }));
    })
    .catch((err) => errorHandler(err, next));
};
