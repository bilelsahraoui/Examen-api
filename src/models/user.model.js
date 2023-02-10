const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
    maxLength: 50,
    minLength: 2
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
    maxLength: 50,
    minLength: 2
  },
  address: {
    type: String,
    required: true,
    lowercase: true,
    maxLength: 20,
    minLength: 2
  },
  postalCode: {
    type: String,
    required: true,
    lowercase: true,
    maxLength: 5,
    minLength: 5
  },
  phone: {
    type: String,
    required: true,
    lowercase: true,
    maxLength: 10,
    minLength: 10
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    length: 50,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  freelance: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Freelance' 
  },
  company: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Company' 
  },
},
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {
  
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    this.password = hashedPassword
    next();
  });

})

module.exports = mongoose.model('User', userSchema);
