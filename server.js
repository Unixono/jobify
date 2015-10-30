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


passport.use('local-login', new LocalStrategy(
  function(username, password, done) {
    if( username === 'admin' && password === 'admin' ) {
      var user = {'name': username, 'pass': password};
      return done(null, user);
    }
    else {
      return done(null, false);
    }

    // User.findOne({ username: username  }, function (err, user) {
    //   if (err) { return done(err);  }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.'  });
    //
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.'  });
    //
    //   }
    //   return done(null, user);
    //
    // });

  }
));

passport.use('local-signup', new LocalStrategy(
  function(username, password, done) {
      var user = {'name': username, 'pass': password};
      console.log('created user:');
      console.log(user);
      // WARNING.
      // Partial implementation!!!
      // The registration code always returns successful.
      return done(null, user);

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
app.post('/login',
         passport.authenticate('local-login'),
         function(req, res, next) {
           var request = req.body;
           console.log(request);
           res.json(request);
           // passport.authenticate('local', function(err, user, info) {
           //   console.log(err);
           //   console.log(user);
           //   console.log(info);
           //   if(err) {
           //     return next(err);
           //   }
           //   console.log('success login');
             // console.log(user);
             // return res.status(200).json({text: 'success'});
           // })(req, res, next);
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
