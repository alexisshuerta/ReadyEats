const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// Import routes
const users = require("./ready-eats-api/routes/users");
const index = require("./ready-eats-api/routes/index");

// General setup
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database connection
const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport config
app.use(passport.initialize());
require("./config/passport")(passport);

// Set routes
app.use("/", index);
app.use("/api/users", users);

// Start server
const port = process.env.PORT || 5005;
app.listen(port, () => console.log(`Ready Eats server and running on port ${port} !`));
