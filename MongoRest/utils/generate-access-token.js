const jwt = require("jsonwebtoken");

exports.generateAccessToken = (username) => {
  return jwt.sign({ name: username }, process.env.TOKEN_SECRET, {
    expiresIn: "10h",
  });
};
