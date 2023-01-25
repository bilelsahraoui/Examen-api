const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller');
// const { checkEmail, checkIdentity, checkPassword, validation } = require('../middlewares/validators');
// checkEmail, checkPassword, validation, 

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
