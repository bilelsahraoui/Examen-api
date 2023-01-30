const User = require('../models/user.model');

async function verifyIsFreelance (req, res, next) {
  const verifyUser = await User.findById(req.userToken.id).populate('freelance');
  if(verifyUser.freelance){
    next();
  }else{
    return res.status(401).send({ message: "You must be a Freelance" });
  }
}

module.exports = verifyIsFreelance;