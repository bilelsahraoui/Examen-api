const express = require('express');

const router = express.Router();
const freelanceController = require('../controllers/freelance.controller');
const verifyToken = require('../middlewares/verifiyToken');
// const { checkEmail, checkIdentity, checkPassword, validation } = require('../middlewares/validators');
// checkEmail, checkPassword, validation, 



router.post('/register', verifyToken, freelanceController.register);
router.get('/', freelanceController.getAllFreelances);
router.get('/:id', freelanceController.getFreelance);

module.exports = router;
