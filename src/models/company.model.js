const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    maxLength: 40,
    minLength: 2
  },
  status: {
    type: String,
    required: true,
    lowercase: true,
  },
  siret: {
    type: String,
    required: true,
    lowercase: true,
    maxLength: 14,
    minLength: 14
  },
  siege: {
    type: String,
    required: true,
    lowercase: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Company', companySchema);
