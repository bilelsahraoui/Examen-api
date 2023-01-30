const User = require('../models/user.model');

function verifyIsFreelance(req, res, next) {
  const verifyUser = User.findById(req.userToken.id).populate('freelance');
  if(verifyUser.freelance !== null){
    next();
  }
  return res.status(401).send({ message: "You must be a Freelancer" });
}

module.exports = verifyIsFreelance;