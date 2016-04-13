var mongoose = require('mongoose');

var offerSchema = mongoose.Schema({
  developers: Array,
  company: String,
  position: String,
  url: String,
  skillsRequired: Array,
  skillsDesired: Array,
  otherSkillsRequired: String,
  otherSkillsDesired: String,
  developerNotes: String,
  managerNotes: String,
  applicationResult: String,
  status: String, //new,applied,rejected,resolved, removed
  applicationMethod: String, //values: form or the email
  applicationEmail: String, //values: form or the email
  coverLetter: String,
  adviceToScrapp: String
});

module.exports = mongoose.model('Offer', offerSchema);
