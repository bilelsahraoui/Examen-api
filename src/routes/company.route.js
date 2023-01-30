const express = require('express');

const router = express.Router();
const companyController = require('../controllers/company.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyCompanyRegistered = require('../middlewares/verifyCompanyRegistered');

router.post('/register', verifyToken, verifyCompanyRegistered, companyController.register);
router.get('/', verifyToken, companyController.getAllCompanies);
router.get('/:id', verifyToken, companyController.getCompanyById);

module.exports = router;
