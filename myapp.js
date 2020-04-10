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

    froot= (fdir + fname + fext).replace('/', '');

    var mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif'
    };

    if(froot){
      //read the file from document root
      fs.readFile(froot, function(err, data) {
        
        if (mimeTypes.hasOwnProperty(fext)) {
          res.writeHead(200, {'Content-Type': mimeTypes[fext]}); 
          res.write("<script>var page='" + fname + "';</script>");
          res.end(data, 'utf-8'); //End the call with the data that it was pulled
        }
        
      });
    }
  })
  .listen("3306");