const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
  posts: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Feed" }],
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
