"use strict"
var fs = require("fs"); //require file system
var http = require("http"); //require http functionality
var path = require("path");
var url = require("url");

var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// sudo npm install -g express
// sudo npm install -g ejs
// sudo npm install -g request
// sudo npm install -g body-parser
// /home/vagrant/.nvm/versions/node/v13.12.0/bin/npm install -g ejs --save

var ejs = require("ejs");
const router = express.Router();
var app = express()
app.set("vew engine", "ejs");
app.engine("ejs", require("ejs").__express);

router.get("/", function(req, res){
  res.render("index", {pagename: "Home"}); // /views/index.ejs
});

router.get("/about", function(req, res){
  res.render("about", {pagename: "About"}); // /views/about.ejs
});

app.use(expresss.static("public"));
app.use("/", routere);
var server = app.listen("3306");
