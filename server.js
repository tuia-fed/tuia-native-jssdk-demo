var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var mime = require("mime");
var hostName = null;
var port = 3333;


var getIPAdress = function() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}

hostName = getIPAdress();

app.get('*', (req, res) => {
  let pathFile = path.join(__dirname, './', req.path);
  
  fs.readFile(pathFile, 'utf8' ,function(err, text) {
    res.writeHead(200,{'Content-type':mime.lookup(pathFile) + ';charset=utf-8'});
    res.end(text);
  });

});

console.log(`服务器运行在http://${hostName}:${port}`);