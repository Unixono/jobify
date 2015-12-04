var LocalStrategy = require('passport-local').Strategy;

// Import the user model.
var User = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    console.log('serializeUser');
    console.log(user);
    console.log(user._id);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserializeUser');
    console.log(id);
    User.findById(id, function(err, user) {
      done(err, user);
    });
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
  }, function(req, username, password, done) {
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
        // newUser.isDeveloper = req.body.isDeveloper;
        newUser.role = req.body.role;

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
};
