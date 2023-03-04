const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

// get config vars
dotenv.config();

const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

// const allowHeaders = require("./utils/allow-headers");

const cors = require("cors");
const upload = require("./utils/upload");
const app = express();

// Add headers before the routes are defined
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.single("image"));

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);
app.use("/static", express.static(path.join(__dirname, "public")));

// general error handling
app.use((error, req, res) => {
  const { statusCode, message } = error;
  res.status(statusCode || 500).json({ message });
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
  });
});
