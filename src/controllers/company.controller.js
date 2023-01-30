const Company = require("../models/company.model");
const User = require("../models/user.model");

exports.register = async (req, res) => {
    Company.find({ user: req.userToken.id }).then(company => {
        if(company){
            return res.status(400).send({ message: "Company already registered" });
        }
    });
    const newCompany = new Company({
        name: req.body.name,
        status: req.body.status,
        siret: req.body.siret,
        siege: req.body.siege,
        user: req.userToken.id,
    });

    try {
        const updateUser = await User.findByIdAndUpdate(req.userToken.id, { 
            company: newCompany._id
        });
        updateUser.save();
        const companySave = await newCompany.save();
        res.status(201).send({ message: "Company created", companySave });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find().populate('user');
        res.status(200).send(companies);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getCompanyById = async (req, res) => {
    try {
        // .populate('skill').populate('job')
        const company = await Company.findById(req.params.id).populate('user');
        res.status(200).send(company);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}