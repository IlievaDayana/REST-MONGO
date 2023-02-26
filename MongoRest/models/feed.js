const mongoose = require("mongoose");

const feedSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    creator: { type: String, required: true },
  },
  { timestamps: true }
);

const Feed = mongoose.model("Post", feedSchema);

module.exports = { Feed };
