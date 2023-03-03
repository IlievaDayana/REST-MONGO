const { Feed } = require("../models/feed");

exports.getFeed = (req, res) => {
  Feed.find().then((data) => {
    return res
      .status(200)
      .send(JSON.stringify({ posts: data, totalPosts: data.length }));
  });
};

exports.postFeed = (req, res, next) => {
  console.log(req.body);
  Feed.create(req.body)
    .then((response) => {
      res.status(201).send(JSON.stringify(response));
      next();
    })
    .catch((error) => console.log("error :", error));
};

exports.getPost = (req, res, next) => {
  const { postId } = req.params;
  // Feed.findOne({ _id: postId })
  //   .then((response) => {
  //     res.status(200).send(JSON.stringify(response));
  //     next();
  //   })
  //   .catch((error) => console.log("error :", error));
};

exports.editFeed = (req, res, next) => {
  const { postId } = req.params;
  Feed.findOneAndUpdate({ _id: postId }, req.body)
    .then((response) => {
      res.status(201).send(JSON.stringify(response));
      next();
    })
    .catch((error) => console.log("error :", error));
};
