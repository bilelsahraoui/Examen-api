const Freelance = require("../models/freelance.model");
const User = require("../models/user.model");
const Skill = require("../models/skill.model");

exports.register = async (req, res) => {
    Freelance.find({ user: req.userToken.id }).then(freelance => {
        if(freelance){
            return res.status(400).send({ message: "You have already registered a freelancer" });
        }
    });
    const userSkills = [];
    if(req.body.skills){
        req.body.skills.forEach(skill => {
            const newSkill = new Skill({
                name: skill.name,
            });
            newSkill.save();
            userSkills.push(newSkill._id);
        });
    }
    const newFreelance = new Freelance({
        dailyPrice: req.body.dailyPrice,
        yearsOfExperience: req.body.yearsOfExperience,
        user: req.userToken.id,
        skills: userSkills,
        jobs: req.body.jobs,
    });

    try {
        const updateUser = await User.findByIdAndUpdate(req.userToken.id, { 
            freelance: newFreelance._id
        });
        updateUser.save();
        const freelanceSave = await newFreelance.save();
        res.status(201).send({ message: "Freelancer created", freelanceSave });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllFreelances = async (req, res) => {
    try {
        const freelances = await Freelance.find().populate('user').populate('skills');
        res.status(200).send(freelances);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getFreelanceById = async (req, res) => {
    try {
        // .populate('skill').populate('job')
        const freelance = await Freelance.findById(req.params.id).populate('user').populate('skills');
        res.status(200).send(freelance);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}