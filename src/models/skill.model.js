const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
});

module.exports = mongoose.model('Skill', skillSchema);
