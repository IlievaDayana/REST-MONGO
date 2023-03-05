const { validationResult } = require("express-validator");
const { User } = require("../models/user");
const { errorHandler } = require("../utils/errorHandler");
const { generateAccessToken } = require("../utils/generate-access-token");
const {
  validateUserPassword,
  createUserPassword,
} = require("../utils/validateUser");

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed!", errors: errors.array() });
  }
  const { name, password, email } = req.body;
  createUserPassword(password)
    .then((hash) => {
      return User.create({ name, password: hash, email });
    })
    .then((response) => generateAccessToken(response.email))
    .then((response) => {
      res.status(201).send(JSON.stringify(response));
      next();
    })
    .catch((err) => errorHandler(err, next));
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed!", errors: errors.array() });
  }
  const { password, email } = req.body;
  let userId;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        validationResult.error = "User with that email not found!";
        return;
      }
      userId = user._id;
      return validateUserPassword(password, user.password);
    })
    .then((isValidPassword) => {
      if (isValidPassword) {
        const data = { token: generateAccessToken(email), userId };
        res.status(201).send(JSON.stringify(data));
      }
    })
    .catch((err) => errorHandler(err, next));
};
