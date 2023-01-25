const { body, validationResult } = require('express-validator');

exports.checkEmail = [
  body('email').isEmail().withMessage("Email format not valid")
]

exports.checkIdentity = [
  body('firstName').isAlphanumeric().withMessage('FirstName format is not valid'),
  body('lastName').isAlphanumeric().withMessage('LastName format is not valid')
]

exports.checkPassword = [
  body('password')
    .notEmpty()
    .isLength({ min: 11, max: 30 })
    .matches(/^[A-Za-z0-9 .,'!&(§è!çà)]+$/)
]

exports.validation = (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors:errors.array()
    })
  }

  next();

}