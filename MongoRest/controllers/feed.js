const { Feed } = require("../models/feed");

exports.getFeed = (req, res) => {
  Feed.find().then((data) => {
    return res
      .status(200)
      .send(JSON.stringify({ posts: data, totalPosts: data.length }));
  });
};

exports.postFeed = (req, res, next) => {
  Feed.create(req.body)
    .then((response) => {
      res.status(201).send(JSON.stringify(response));
      next();
    })
    .catch((error) => console.log("error :", error));
};
