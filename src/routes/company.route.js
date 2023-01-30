const express = require('express');

const router = express.Router();
const companyController = require('../controllers/company.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyCompanyRegistered = require('../middlewares/verifyCompanyRegistered');

router.post('/register', verifyToken, verifyCompanyRegistered, companyController.register);
router.get('/', companyController.getAllCompanies);
router.get('/:id', companyController.getCompanyById);

module.exports = router;
