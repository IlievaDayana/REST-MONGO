const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { signUp, login } = require("../controllers/auth");

router.post(
  "/login",
  body("password").trim().isLength({ min: 6 }),
  body("email").trim().isEmail(),
  login
);

router.post(
  "/sign-up",
  body("password").trim().isLength({ min: 6 }),
  body("email").trim().isEmail(),
  signUp
);

module.exports = router;
