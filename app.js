require("dotenv").config(); //for .env file with config details
const express = require("express");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

// initialising the app
const app = express();

//Defining the port
const PORT = process.env.PORT || 5000;
//url for mongodb connection
const url = process.env.MONGODB_URI;

//Middleware to run when any call is made
//static for accessing html/css/image files inside public folder
app.use(express.static(path.join(__dirname, "/public")));
//body-parser to read user input
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//HOME page--------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/HomePage.html"));
});

//LOGIN page--------------------------------------------------------------------------------
//get
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html"));
});

//post
app.post("/submit", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) throw err;
    client
      .db("cfairdb")
      .collection("users")
      .findOne({ email: req.body.email }, (err, result) => {
        if (result == null || result.password != req.body.password) {
          res.redirect(path.join(__dirname, "/public/login.html"));
        } else {
          if (result.usertype == "user") {
            res.sendFile(path.join(__dirname, "/public/cfairmap.html"));
          } else {
            res.sendFile(path.join(__dirname, "/public/HomePage.html"));
          }
        }
      });
  });
  //res.redirect('/users/' + req.user.username);
});

//ADMIN page--------------------------------------------------------------------------------
//get
// app.get("/Admin", (req, res) => {

// });

//CFAIR MAP page-----------------------------------------------------------------------------
app.get("/cfairmap", (req, res) => {
  // MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
  //   if (err) throw err;
  //   client
  //     .db("cfairdb")
  //     .collection("users")
  //     .find()
  //     .each((err, doc) => {
  //     });
  //connect to Database.companies and get the list of companies
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
