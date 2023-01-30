const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, userController.getAllUsers);
router.get('/:id', verifyToken, userController.getUserById);

module.exports = router;
