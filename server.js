var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public/dist'));

var port = 3000;
app.listen(port);
console.log('Running on port ' + port);
