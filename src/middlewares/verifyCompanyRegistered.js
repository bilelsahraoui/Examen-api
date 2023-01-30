const User = require('../models/user.model');

async function verifyCompanyRegistered(req, res, next){
  const verifyUser = await User.findById(req.userToken.id).populate('company');
  if(verifyUser.company){
    return res.status(401).send({ message: "Cannot create a company, company already registered" });
  }else{
    next();
  }
}

module.exports = verifyCompanyRegistered;