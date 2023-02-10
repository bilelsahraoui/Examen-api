const express = require('express');

const router = express.Router();
const adminController = require('../controllers/admin.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyIsAdmin = require('../middlewares/verifyIsAdmin');

router.get('/user', verifyToken, verifyIsAdmin, adminController.getUser);
router.get('/mission', verifyToken, verifyIsAdmin, adminController.getMission);
router.get('/skill', verifyToken, verifyIsAdmin, adminController.getSkill);
router.post('/job', verifyToken, verifyIsAdmin, adminController.createJob);
router.post('/skill', verifyToken, verifyIsAdmin, adminController.createSkill);
router.patch('/user', verifyToken, verifyIsAdmin, adminController.updateUser);
router.patch('/skill', verifyToken, verifyIsAdmin, adminController.updateSkill);
router.patch('/job', verifyToken, verifyIsAdmin, adminController.updateJob);
router.delete('/user', verifyToken, verifyIsAdmin, adminController.deleteUser);
router.delete('/skill', verifyToken, verifyIsAdmin, adminController.deleteSkill);
router.delete('/job', verifyToken, verifyIsAdmin, adminController.deleteJob);

module.exports = router;
