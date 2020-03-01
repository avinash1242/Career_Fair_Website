const express = require("express");
const path = require("path");

// initialising the app
const app = express();

//Defining the port
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/HomePage.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "public/login.html");
});

app.post("/submit", (req, res) => {
  //check if user exists in mongodb
  //check if user is admin or user
  //assign necessary variables accordingly
});

// //resolve request for admin page
// app.get("/Admin", (req, res) => {

// });

// //resolve request for cfair map
// app.get("/cfairmap", (req, res) => {

// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
