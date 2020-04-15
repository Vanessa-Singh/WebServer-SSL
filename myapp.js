"use strict";
var fs = require("fs"); //require file system
var http = require("http"); //require http functionality
var path = require("path");
var url = require("url");
var express = require("express");
var request = require("request");
//Need to use bodyParser() in order for the form data to be available in req.body.
var bodyParser = require("body-parser");

var ejs = require("ejs");
const router = express.Router();

var app = express();
//Tell the Express framework to use ejs as a templating engine
app.set("vew engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Get the app to use route when the user triggers(click) a nav link
router.get("/", function (req, res) {
  res.render("index.ejs", { pagename: "Home" }); // /views/index.ejs
});

router.get("/about", function (req, res) {
  res.render("about.ejs", { pagename: "About" });
});

router.get("/services", function (req, res) {
  res.render("services.ejs", { pagename: "Services" });
});

router.get("/contact", function (req, res) {
  res.render("contact.ejs", { pagename: "Contact" });
});

router.post("/register", function (req, res) {
  console.log(req.body.email);
  console.log(req.body.password);
  var errors = [];

  if (req.body.email == "") {
    errors.push("Email is required");
  } else if (req.body.email != "") {
    //Reg expression for validating email
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
      errors.push("Email is not valid. Please try again.");
    }
  }
  //Reg expression for strong password validation
  var strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (req.body.password == "") {
    errors.push("Password is required");
  } 
  else if (req.body.password != "") {
    if (!strongRegex.test(req.body.password)) {
      errors.push("Password is not valid.")
      errors.push("√ Password's length must be a minimum of 8 character")
          errors.push("√ Password must include at least one upper case, " +
              "one number and one special character.");
          
    }
  }
  //Render the index page one more time
  res.render("index.ejs", {
    pagename: "Home",
    errors: errors,
  });
});

app.use(express.static("public"));
app.use("/", router);
var server = app.listen("3306");

// sudo npm install -g express
// sudo npm install -g ejs
// sudo npm install -g request
// sudo npm install -g body-parser
// /home/vagrant/.nvm/versions/node/v13.12.0/bin/npm install -g ejs --save
