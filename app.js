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
app.use(express.static(path.join(__dirname, "/public"))); //static for accessing html/css/image files inside public folder
app.use(bodyParser.json()); //body-parser to read user input
app.use(bodyParser.urlencoded({ extended: false }));

//Set view engine to pug
app.set("views", "./views");
app.set("view engine", "ejs");

//HOME page--------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/HomePage.html"));
});

//LOGIN page--------------------------------------------------------------------------------
//get
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html"));
});


//get
app.get("/AdminPreview", (req, res) => {
  res.sendFile(path.join(__dirname, "public/AdminPreview.html"));
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
            res.sendFile(path.join(__dirname, "/public/AdminPage.html"));
          }
        }
      });
  });
  //res.redirect('/users/' + req.user.username);
});

//ADMIN Main page--------------------------------------------------------------------------------
app.get("/AdminPage", (req, res) => {
  //connect to Database.companies and get the list of companies
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) throw err;
    client
      .db("cfairdb")
      .collection("companies")
      .find()
      .toArray((err, result) => {
        if (err) throw err;
        res.render("AdminPage.ejs", { companies: result });
      });
  });
});

//ADMIN Preview page--------------------------------------------------------------------------------
app.get("/AdminPreview", (req, res) => {
  //connect to Database.companies and get the list of companies
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) throw err;
    client
      .db("cfairdb")
      .collection("companies")
      .find()
      .toArray((err, result) => {
        if (err) throw err;
        res.render("AdminPreview.ejs", { companies: result });
      });
  });
});

//CFAIR MAP page-----------------------------------------------------------------------------
app.get("/cfairmap", (req, res) => {
  //connect to Database.companies and get the list of companies
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) throw err;
    client
      .db("cfairdb")
      .collection("companies")
      .find()
      .toArray((err, result) => {
        if (err) throw err;
        res.render("cfairmap.ejs", { companies: result });
      });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
