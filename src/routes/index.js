const express = require('express');

const router = express.Router();
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const freelanceRouter = require('./freelance.route');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/freelance', freelanceRouter);

module.exports = router;
