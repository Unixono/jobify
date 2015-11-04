var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  isDeveloper: Boolean
});

module.exports = mongoose.model('User', userSchema);
