const express = require('express');

const router = express.Router();
const missionController = require('../controllers/mission.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsCompany = require('../middlewares/verifyIsCompany');
const verifyIsFreelance = require('../middlewares/verifyIsFreelance');

router.post('/create', verifyToken, verifyIsCompany, missionController.createMission);
router.get('/', verifyToken, missionController.getAllMissions);
router.get('/:id', verifyToken, missionController.getMissionById);
router.post('/proposer', verifyToken, verifyIsCompany, missionController.proposer);
router.post('/decide', verifyToken, verifyIsFreelance, missionController.decide);

module.exports = router;
