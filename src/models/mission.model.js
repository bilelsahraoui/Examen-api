const mongoose = require('mongoose');

const missionSchema = mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
  },
  title: {
    type: String,
    required: true,
    lowercase: true,
  },
  status: {
    type: String,
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Job'
  },
  skills: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }
  ],
  company: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Company'
  }
  
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Mission', missionSchema);
