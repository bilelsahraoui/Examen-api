const User = require('../models/user.model');

async function verifyFreelanceRegistered(req, res, next) {
  const verifyUser = await User.findById(req.userToken.id).populate('Company');
  if(verifyUser.company != null){
    return res.status(401).send({ message: "Cannot create a freelance, company already registered" });
  }else{
    next();
  }
}

module.exports = verifyFreelanceRegistered;