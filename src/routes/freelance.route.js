const express = require('express');

const router = express.Router();
const freelanceController = require('../controllers/freelance.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyFreelanceRegistered = require('../middlewares/verifyFreelanceRegistered');

router.post('/register', verifyToken, verifyFreelanceRegistered, freelanceController.register);
router.get('/', freelanceController.getAllFreelances);
router.get('/:id', freelanceController.getFreelanceById);

module.exports = router;
