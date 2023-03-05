const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { signUp, login } = require("../controllers/auth");
const { User } = require("../models/user");

router.post(
  "/login",
  body("password").trim().isLength({ min: 6 }),
  body("email").trim().isEmail(),
  login
);

router.post(
  "/sign-up",
  body("email")
    .trim()
    .isEmail()
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),
  body("password").trim().isLength({ min: 6 }),
  signUp
);

module.exports = router;
