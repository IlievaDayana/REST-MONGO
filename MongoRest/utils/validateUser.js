const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.validateUserPassword = (password,hash) => {
  return bcrypt
    .compare(password, hash)
    .then((res) => true)
    .catch((err) => console.error(err.message));
};

exports.createUserPassword = (password) => {
 return bcrypt.genSalt(saltRounds).then((salt) => bcrypt.hash(password, salt));
};
