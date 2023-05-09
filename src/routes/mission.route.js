const express = require('express');

const router = express.Router();
const missionController = require('../controllers/mission.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsCompany = require('../middlewares/verifyIsCompany');
const verifyIsFreelance = require('../middlewares/verifyIsFreelance');

router.post('/create', verifyToken, verifyIsCompany, missionController.createMission);
router.get('/', verifyToken, missionController.getAllMissions);
router.get('/:id', verifyToken, missionController.getMissionById);
router.get('/user/:id', verifyToken, missionController.getMissionByFreelancer);
router.get('/company/:id', verifyToken, missionController.getMissionByCompany);
router.post('/proposer', verifyToken, verifyIsCompany, missionController.proposer);
router.put('/modify/:id', verifyToken, verifyIsCompany, missionController.modifyMission);
router.post('/decide', verifyToken, verifyIsFreelance, missionController.decide);
router.delete('/delete/:id', verifyToken, verifyIsCompany, missionController.deleteMission);

module.exports = router;
