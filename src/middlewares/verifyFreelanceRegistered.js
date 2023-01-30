const User = require('../models/user.model');

async function verifyFreelanceRegistered(req, res, next) {
  const verifyUser = await User.findById(req.userToken.id).populate('freelance');
  if(verifyUser.freelance){
    console.log(verifyUser)
    return res.status(401).send({ message: "Cannot create a freelance, freelance already registered" });
  }else{
    next();
  }
}

module.exports = verifyFreelanceRegistered;