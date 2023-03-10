const mongoose = require('mongoose');

const missionSchema = mongoose.Schema({
  date_start: {
    type: Date,
    required: true,
  },
  date_end: {
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
  freelancers: [
    { 
      freelance: {type: mongoose.Schema.Types.ObjectId, ref: 'Freelance'},
      isAccepted: {
        type: Boolean,
        default: false
      }
    },
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
