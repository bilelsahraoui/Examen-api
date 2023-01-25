const mongoose = require('mongoose');

const freelanceSchema = mongoose.Schema({
  dailyPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
    min: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  skills: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }
  ],
  jobs: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }
  ]
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Freelance', freelanceSchema);
