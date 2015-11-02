// Create an express instance.
var express = require('express');
var app = express();
// Tells the app how to parse the body of the request.
var bodyParser = require('body-parser');
var session = require('express-session');

// We will use passport for authentication. http://passportjs.org/docs/overview
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Mongoose config.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jobify');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('connection successful');
});

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  isDeveloper: Boolean
});

var User = mongoose.model('User', userSchema);


// Set the path to the website files.
app.use(express.static(__dirname + '/public/dist'));

// Passport requirements.
// For now, we will comment the persistent session code.
// app.use(session({ secret: 'jobifyKey', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.json())

// Add this to allow CORS.
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


// Login Strategy.
passport.use('local-login', new LocalStrategy(
  function(username, password, done) {
    // Search for a user with thr given username and password.
    var searchUser = {'username': username, 'password': password};
    User.findOne(searchUser, function (err, user) {
      if(err) {
        return done(err);
      }

      // TODO:
      // - detect what was wrong: username or passowrd.
      if(!user) {
        return done(null, false, { message: 'Incorrect user.' });
      }

      return done(null, user);
    });
  }
));

// Signup Strategy.
passport.use('local-signup', new LocalStrategy({
  // Set this option to true in oder to pass the req object
  // as the first argument of the strategy function.
  passReqToCallback: true
},
function(req, username, password, done) {
  User.findOne({ 'username' :  username }, function(err, user) {
      console.log('SINGUP USER...');
      console.log(err);
      console.log(user);
      console.log(req.body);
      // if there are any errors, return the error
      if(err) {
        console.log('error');
        console.log(err);
        return done(err);
      }
      // check to see if theres already a user with that email
      if(user) {
        console.log('error');
        console.log(err);
        // return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        return done(null, false);
      }
      else {
        // if there is no user with that email
        // create the user
        var newUser = new User();

        // set the user's local credentials
        newUser.username = username;
        newUser.password = password;
        newUser.email = req.body.email;
        newUser.isDeveloper = req.body.isDeveloper;

        // save the user
        newUser.save(function(err) {
          if (err) {
            throw err;
          }

          return done(null, newUser);
        });
      }

    });
  }
));

passport.serializeUser(function(user, done) {
  console.log('serializeUser');
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser');
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
});


// Routes
app.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    // console.log('in login route!');
    // console.log(err);
    // console.log(user);
    // console.log(info);

    if(err) {
      return res.status(500).json({error: err});
    }

    if(!user) {
      return res.status(401).json({error: info});
    }

    req.logIn(user, function(err) {
      if(err) {
        return res.status(500).json({error: 'Could not log in user'});
      }

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
