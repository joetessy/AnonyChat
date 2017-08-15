var extract = require('./extract');
var fs = require('fs');
var mime = require('mime');

var handleError = (err, res) => {
  res.writeHead(404);
  var filePath = extract('/404.html');
  console.log(filePath);
  fs.readFile(filePath, (_, data) => {
    res.end(data);
  });
};

var readFile = (req, res) => {
  var url = req.url;
  var filePath = extract(url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.setHeader('Content-Type', mime.lookup(filePath));
      res.end(data);
    }
  });
};

module.exports = readFile;
