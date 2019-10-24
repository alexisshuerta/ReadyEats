// Importing express, mongoose, and body parser
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

//
var db = mongoose.connect("mongodb://localhost/swag-shop");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Importing routes
var index = require("./routes/index");

// Routes
app.use("/", index);

//
app.listen(3004, function() {
  console.log("ReadyEats API running on port 3004...");
});
