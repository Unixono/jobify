var express = require('express');
var app = express();

// Set the path to the website files.
app.use(express.static(__dirname + '/public/dist'));

var port = 3000;
app.listen(port);
console.log('Running on port ' + port);
