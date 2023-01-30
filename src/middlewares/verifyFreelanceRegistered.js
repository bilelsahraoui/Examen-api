const User = require('../models/user.model');

async function verifyFreelanceRegistered(req, res, next) {
  const verifyUser = await User.findById(req.userToken.id).populate('freelance');
  if(verifyUser.company){
    return res.status(401).send({ message: "Cannot create a freelance as company" });
  }else{
    next();
  }
}

module.exports = verifyFreelanceRegistered;