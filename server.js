// Create an express instance.
var express = require('express');
var app = express();
// Tells the app how to parse the body of the request.
var bodyParser = require('body-parser');

// Mongoose config.
var mongoose = require('mongoose');
// mongoose.connect('mongodb://jobify');
mongoose.connect('mongodb://0.0.0.0/jobify');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('connection successful');
});

// Import the user model.
var User = require('./models/user');
var Offer = require('./models/offer');

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
  res.header('Access-Control-Allow-Origin', 'http://0.0.0.0:9000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// Set the path to the website files.
app.use(express.static(__dirname + '/public/dist'));

require('./app/passport.js')(passport);


function isLoggedIn(req, res, next) {
  // console.log('isAuthenticated() in middleware');
  // console.log(req.isAuthenticated());
  // console.log(req.session);
  // console.log('Session Expiry '+req.session.cookie.expires);
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  // res.redirect('/');
  res.status(401).json({error: 'Unauthorized'});
}


// Routes

app.put('/saveoffer', isLoggedIn, function(req, res, next) {
  // console.log('isAuthenticated()');
  // console.log(req.isAuthenticated());
  // console.log(req.body);
  var offer = new Offer(req.body);
  offer.save(function (err, saved) {
    if(err) {
      return err;
    }
    // console.log(saved);
    res.status(200).json({status: 'Offer saved Successfull!', saved: saved});
  });
});

app.put('/updateoffer', isLoggedIn, function(req, res, next) {
  // console.log('isAuthenticated()');
  // console.log(req.isAuthenticated());
  // console.log(req.body);


  Offer.findById(req.body.id, function (err, offer) {
    if(err) {
      return err;
    }

    // console.log('offer1');
    // console.log(offer);
    offer.developers = req.body.offer.developers;
    offer.company = req.body.offer.company;
    offer.position = req.body.offer.position;
    offer.url = req.body.offer.url;
    offer.skillsRequired = req.body.offer.skillsRequired;
    offer.skillsDesired = req.body.offer.skillsDesired;
    offer.otherSkillsRequired = req.body.offer.otherSkillsRequired;
    offer.otherSkillsDesired = req.body.offer.otherSkillsDesired;
    offer.developerNotes = req.body.offer.developerNotes;
    offer.managerNotes = req.body.offer.managerNotes;
    offer.applicationResult = req.body.offer.applicationResult;
    offer.status = req.body.offer.status;
    offer.applicationMethod = req.body.offer.applicationMethod;
    offer.applicationEmail = req.body.offer.applicationEmail;
    offer.coverLetter = req.body.offer.coverLetter;
    offer.adviceToScrapp = req.body.offer.adviceToScrapp;
    offer.creationDate = req.body.offer.creationDate;
    offer.applyRejectDate = req.body.offer.applyRejectDate;

    offer.save (function (err) {
      if (err) {
        return err;
      }
    });
    // console.log(offer);
    res.status(200).json({status: 'Offer updated Successfull!'});
  });
});

app.put('/removeoffer/:id', isLoggedIn, function(req, res, next) {
  // console.log('isAuthenticated()');
  // console.log(req.isAuthenticated());
  // console.log(req.body);
  Offer.findByIdAndRemove(req.params.id, function (err,offer){
    if(err) {
      return err;
    }
  });
  res.status(200).json({status: 'Offer removed Successfull!'});
});

app.get('/getdeveloperlist', isLoggedIn, function(req, res, next) {
  // console.log('isAuthenticated()');
  // console.log(req.isAuthenticated());
  // console.log(req);
  User.find({role: 'developer'}, function (err, devs) {
    if(err) {
      return err;
    }
    // console.log(devs);
    res.status(200).json({status: 'Get devs Successfull!', devs : devs});
  });
});

app.post('/offer-list', isLoggedIn, function(req, res, next) {
  // console.log('isAuthenticated()');
  // console.log(req.isAuthenticated());
  // console.log(req.body);

  var filter = {
    developers: { $in: req.body.developers },
    status: { $in: req.body.status }
  };

  if (req.body.company !== '') {
    filter.company = {'$regex': req.body.company, '$options': 'i'};
  }

  if (req.body.position !== '') {
    filter.position = {'$regex': req.body.position, '$options': 'i'};
  }

  Offer.find(filter, function (err, offers) {
    if(err) {
      return err;
    }
    // console.log(offers);
    res.status(200).json({status: 'Get offers Successfull!', offers : offers});
  });
});

app.get('/offer/:id', isLoggedIn, function(req, res, next) {
  // console.log('isAuthenticated()');
  // console.log(req.isAuthenticated());
  // console.log(req.params.id);

  Offer.findById(req.params.id, function (err, offer) {
    if(err) {
      return err;
    }
    // console.log(offer);
    res.status(200).json({status: 'Get offer Successfull!', job : offer});
  });
});

app.get('/getuser', isLoggedIn, function(req, res, next) {
    // console.log('in getuser');
    res.status(200).json({status: 'Get User Successfull!', user: req.user});
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    // console.log('in login route!');
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
      // console.log('inside login function');
      if(err) {
        return res.status(500).json({error: 'Could not log in user'});
      }

      // console.log('isAuthenticated from login route');
      // console.log(req.isAuthenticated());
      // console.log(req.user);
      // console.log(req.session);
      res.status(200).json({status: 'Login successful!', user: user});
    });

  })(req,res,next);
});

app.post('/logout', function(req, res){
  passport.authenticate('local-logout', function(err, user, info) {
    // console.log('in logout route!');
    // console.log(req);
    // console.log(err);
    // console.log(user);
    // console.log(info);
    if(err) {
      return res.status(500).json({error: err});
    }
    req.logout();
    res.status(200).json({status: 'Logout successful!', user: null});
  })(req,res);
});

app.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    // console.log('in signup route');
    // console.log(err);
    // console.log(user);
    // console.log(info);
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.status(500).json({ success : false, message : 'authentication failed'  });
    }

    req.login(user, function(err) {
      // console.log('inside login function');
      if(err) {
        return res.status(500).json({error: 'Could not log in user'});
      }

      // console.log('isAuthenticated from login route');
      // console.log(req.isAuthenticated());
      // console.log(req.user);
      // console.log(req.session);
      res.status(200).json({succes : true, status: 'Login successful!', user: user});
    });
    // return res.status(200).json({ success : true, message : 'authentication succeeded', user : user  });
  })(req, res, next);
});

app.put('/updateuser', function(req, res, next) {
  passport.authenticate('local-updateuser', function(err, user, info) {
    // console.log('in updateuser route');
    // console.log(err);
    // console.log(user);
    // console.log(info);
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.status(500).json({ success : false, message : 'authentication failed'  });
    }

    req.login(user, function(err) {
      // console.log('inside login function');
      if(err) {
        return res.status(500).json({error: 'Could not log in user'});
      }

      // console.log('isAuthenticated from login route');
      // console.log(req.isAuthenticated());
      // console.log(req.user);
      // console.log(req.session);
      res.status(200).json({succes : true, status: 'Login successful!', user: user});
    });
    // return res.status(200).json({ success : true, message : 'authentication succeeded', user : user  });
  })(req, res, next);
});

app.put('/removeuser', function(req, res, next) {
  passport.authenticate('local-removeuser', function(err, user, info) {
    // console.log('in removeuser route');
    // console.log(err);
    // console.log(user);
    // console.log(info);
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.status(500).json({ success : false, message : 'authentication failed'  });
    }

    req.logout();
    res.status(200).json({status: 'Logout successful!', user: null});
  })(req, res, next);
});

var port = 3000;
app.listen(port);
console.log('Running on port ' + port);
