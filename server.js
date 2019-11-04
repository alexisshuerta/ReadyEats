// Importing express, mongoose, and body parser
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//
const db = require("./config/keys").mongoURI;var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5005; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Ready Eats server and running on port ${port} !`));

// Importing routes
var index = require("./ready-eats-api/routes/index");

// Routes
app.use("/", index);
