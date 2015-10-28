// Create an express instance.
var express = require('express');
var app = express();

// Set the path to the website files.
app.use(express.static(__dirname + '/public/dist'));

// Add this to allow CORS.
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

var port = 3000;
app.listen(port);
console.log('Running on port ' + port);
