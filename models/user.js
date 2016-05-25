var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: String,
  filter: Array
});

module.exports = mongoose.model('User', userSchema);
