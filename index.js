var http = require ('http');
var readFile = require('./read_file');

var server = http.createServer((req, res) => {
  console.log('Responding to a request.');
  readFile(req, res);
});
server.listen(3000);
