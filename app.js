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

const KG_API_KEY = process.env.API_KEY;

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

//post
app.post("/submit", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
    if (err) throw err;
    client
      .db("cfairdb")
      .collection("users")
      .findOne({ email: req.body.email }, (error, result) => {
        if (error) throw error;
        if (result == null || result.password != req.body.password) {
          res.sendFile(path.join(__dirname, "/public/login.html"));
        } else {
          if (result.usertype == "user") {
            res.redirect("/cfairmap");
          } else {
            res.redirect("/AdminPage");
          }
        }
      });
  });
});

//Uploading File and Submitting
var multer  = require('multer');
var UserData;
var UserDataAddress;

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './AdminData');
  },
  filename: function (req, file, callback) {
    UserData = file.fieldname + '-' + Date.now() +'.csv';
    UserDataAddress = './AdminData/' + UserData;
    callback(null, UserData);
    console.log("User file : " + UserData + " Uploaded!");


//check from here

    const csvjson = require('csvjson');
    const readFile = require('fs').readFile;

    readFile(UserDataAddress, 'utf-8', (err, fileContent) => {
        if(err) {
          console.log(err);
          throw new Error(err);
        }

    const jsonObj = csvjson.toObject(fileContent);
    console.log(jsonObj);
      
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
      if (err) throw err;
      client
      .db("cfairdb")
      .collection("companies")
      .insertMany(jsonObj, function(err, res) {
          if (err) throw err;
          console.log(res.insertedCount+" documents inserted");
      });

    });
  
    });

// Check Ends Here here    
  }
});

var upload = multer({ storage : storage}).single('userPhoto');

app.post('/api/photo',function(req,res){
  upload(req,res,function(err) {
    if(err) {
      return res.end("Error! Please Refresh and Try Again!");
    }
    res.end("Success! Refresh to See Changes!");
  });
});

//ADMIN page--------------------------------------------------------------------------------
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
        res.render("cfairmap.ejs", {
          companies: result,
          GOOGLE_KG_API_KEY: KG_API_KEY
        });
      });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});