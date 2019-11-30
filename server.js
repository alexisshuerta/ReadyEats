const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// Import routes
const users = require("./routes/api/users");
const index = require("./routes/api/index");
const menu = require("./routes/api/menu");
const meals = require("./routes/api/meals");
const reservation = require("./routes/api/reservations");

// General setup
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

// Database connection
const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport config
app.use(passport.initialize());
require("./config/passport")(passport);

// Set routes
app.use("/", index);
app.use("/api/users", users);
app.use("/api/menu", menu);
app.use("/api/meals", meals);
app.use("/api/reservations", reservation);

// Start server
const port = process.env.PORT || 5005;
app.listen(port, () => console.log(`Ready Eats server and running on port ${port} !`));
