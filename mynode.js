var fs = require("fs"); //require file system
var http = require("http"); //require http functionality
var path = require("path");
var url = require("url");

http
  .createServer(function(req, res) {
    //get the request url from the browser then
    //parse it to an object
    // the parsed variable contains an object information obtained from the url
    var parsed = url.parse(req.url);
    var filename = path.parse(parsed.pathname);

    if (filename.name == "") {
      fname = "index";
    } else {
      fname = filename.name;
    }
    if (filename.ext == ""){
      fext = ".html"
    }
    else{
      fext = filename.ext
    }
    if (filename.dir == "/"){
      fdir = ""
    }
    else{
      fdir = filename.dir
    }

    //read the file from document root
    fs.readFile(fdir + fname + fext, function(err, data) {
console.log(fdir + fname + fext);

      res.writeHead(200); //header location
      res.write("<script>var acolor = 'yellow';</script>")
      res.end(data); //End the call with the data that it was pulled
    });
  })
  .listen("4443");