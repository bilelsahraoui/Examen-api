const express = require('express');

const router = express.Router();
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const freelanceRouter = require('./freelance.route');
const companyRouter = require('./company.route');
const missionRouter = require('./mission.route');
const searchRouter = require('./search.route');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/freelance', freelanceRouter);
router.use('/company', companyRouter);
router.use('/mission', missionRouter);
router.use('/search', searchRouter);

module.exports = router;
