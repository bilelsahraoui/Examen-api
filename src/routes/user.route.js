const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, userController.getAllUsers);
router.get('/:id', verifyToken, userController.getUserById);
router.patch('/modify', verifyToken, userController.modifyUser);
router.post('/forgotPassword', userController.forgotPassword);

module.exports = router;
