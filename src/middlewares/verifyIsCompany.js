const User = require('../models/user.model');

function verifyIsCompany(req, res, next) {
  const verifyUser = User.findById(req.userToken.id).populate('Company');
  if(verifyUser.Company !== null){
    next();
  }
  return res.status(401).send({ message: "You must be a Company" });
}

module.exports = verifyIsCompany;