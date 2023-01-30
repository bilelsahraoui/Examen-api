const User = require('../models/user.model');

async function verifyIsCompany (req, res, next) {
  const verifyUser = await User.findById(req.userToken.id).populate('company');
  if(verifyUser.company){
    next();
  }else{
    return res.status(401).send({ message: "You must be a Company" });
  }
}

module.exports = verifyIsCompany;