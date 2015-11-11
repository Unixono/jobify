// Create an express instance.
var express = require('express');
var app = express();
// Tells the app how to parse the body of the request.
var bodyParser = require('body-parser');

// Mongoose config.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jobify');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('connection successful');
});

// Import the user model.
// var User = require('./models/user');

app.use(bodyParser.json());

// Passport required.

// We will use passport for authentication. http://passportjs.org/docs/overview
var passport = require('passport');

var session = require('express-session');
var cookieParser = require('cookie-parser');

app.use(cookieParser('jobifyKey'));

// Passport requirements.
var cookiesExpireTime = 1000 * 60 * 60 * 2; // 2 hours
app.use(session({
  secret: 'jobifyKey',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: false,
    secure:false,
    maxAge: cookiesExpireTime
  }
}));
app.use(passport.initialize());
app.use(passport.session());


// Add this to allow CORS.
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// Set the path to the website files.
app.use(express.static(__dirname + '/public/dist'));

require('./app/passport.js')(passport);


function isLoggedIn(req, res, next) {
  console.log('isAuthenticated() in middleware');
  console.log(req.isAuthenticated());
  console.log(req.session);
  console.log('Session Expiry '+req.session.cookie.expires);
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  // res.redirect('/');
  res.status(401).json({error: 'Unauthorized'});
}


// Routes

app.get('/offer-list', isLoggedIn, function(req, res, next) {
  // console.log('isAuthenticated()');
  // console.log(req.isAuthenticated());
  // console.log('Session Expiry '+req.session.cookie.expires);
  // if(req.isAuthenticated()) {
  console.log('in offer-list');
  // console.log(req);
  res.json({
    'jobs':[{
      'developer': 'Lea',
      'company': 'Google',
      'position': 'Front-end developer',
      'dateAdded': 1288323623006,
      'apply': false
    }, {
      'developer': 'Lea',
      'company': 'SpiderOak',
      'position': 'AngularJS developer',
      'dateAdded': 1288323623006,
      'apply': true
    }, {
      'developer': 'Lea',
      'company': 'Facebook',
      'position': 'Front-end developer',
      'dateAdded': 1288323623006,
      'apply': false
    }]
  });
  // }
  // res.status(401).json({error: 'Unauthotized'});
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    console.log('in login route!');
    // console.log(req);
    // console.log(err);
    // console.log(user);
    // console.log(info);

    if(err) {
      return res.status(500).json({error: err});
    }

    if(!user) {
      return res.status(401).json({error: info});
    }

    req.login(user, function(err) {
      console.log('inside login function');
      if(err) {
        return res.status(500).json({error: 'Could not log in user'});
      }

      console.log('isAuthenticated from login route');
      console.log(req.isAuthenticated());
      console.log(req.user);
      console.log(req.session);
      res.status(200).json({status: 'Login successful!', user: user});
    });

  })(req,res,next);
});

app.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    console.log('in signup route');
    console.log(err);
    console.log(user);
    console.log(info);
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.status(500).json({ success : false, message : 'authentication failed'  });
    }
    return res.status(200).json({ success : true, message : 'authentication succeeded'  });
  })(req, res, next);
});


var port = 3000;
app.listen(port);
console.log('Running on port ' + port);
