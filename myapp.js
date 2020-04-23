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

router.get("/register", function (req, res) {
  res.render("register.ejs", { pagename: "Register" });
});

//LOGIN
router.post("/login", function (req, res) {
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
  } else if (req.body.password != "") {
    if (!strongRegex.test(req.body.password)) {
      errors.push("Password is not valid.");
      errors.push("√ Password's length must be a minimum of 8 character");
      errors.push(
        "√ Password must include at least one upper case, " +
          "one number and one special character."
      );
    }
  }
  //Render the index page one more time
  res.render("index.ejs", {
    pagename: "Home",
    errors: errors,
  });
});

//REGISTER
router.post("/register", function (req, res) {
  var errors = {};
  let gender = true;
  let consent = true;

  //Reg expression for validationg zip code
  var zipcodeRegex = /^\d{5}$|^\d{5}-\d{4}$/;

  //Loop through all the inputs and check if they're empty.
  for (let i in req.body) {
    if (req.body[i] == "") {
      errors[i] = `${i} is required`;
    }
    //Test ZIP code with Regex 
    if (i == "zipcode") {
      
      if (!zipcodeRegex.test(req.body[i])) {
        errors[i] = "Invalid ZIP code. Try again.";
      }
    }

    if (req.body[i] == req.body.age) {
      //If age is not greater than 0 that means the user didn't selected age.
      if (parseInt(req.body.age) <= 0) {
        errors[i] = "age is required";
      }
    }
    //Verify if consent was checked
    if (i == "consent") {
      consent = false;
    }

    //Verify if gender was selected
    if (i == "female" || i == "male") {
      gender = false;
    }
  }
  //If neither gender were checked, generate an error.
  if (gender) {
    errors["gender"] = "Please select your gender.";
  }
  //If consent was not checked then it will generate an error.
  if (consent) {
    errors["consent"] = "consent is required";
  }

  //Object.keys return an array which contains the property names of the object.
  //If the length of the length of the array is 0 then the object is empty.
  if (Object.keys(errors).length === 0) {
    //Render the index page
    res.render("index.ejs", {
      pagename: "Home",
      errors: errors,
    });
  } else {
    //Render the register page one more time
    res.render("register.ejs", {
      pagename: "Register",
      errors: errors,
    });
  }
});

app.use(express.static("public"));
app.use("/", router);
var server = app.listen("3306");
