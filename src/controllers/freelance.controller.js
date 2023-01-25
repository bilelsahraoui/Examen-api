const Freelance = require("../models/freelance.model");
const User = require("../models/user.model");

exports.register = async (req, res) => {
    const newFreelance = new Freelance({
        dailyPrice: req.body.dailyPrice,
        yearsOfExperience: req.body.yearsOfExperience,
        user: req.userToken.id,
        skills: req.body.skills,
        jobs: req.body.jobs,
    });

    const updateUser = await User.findByIdAndUpdate(req.userToken.id, { 
        freelance: newFreelance._id
    });

    updateUser.save();

    try {
        const freelanceSave = await newFreelance.save();
        res.status(201).send({ message: "Freelancer created", freelanceSave });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllFreelances = async (req, res) => {
    try {
        const freelances = await Freelance.find().populate('user');
        res.status(200).send(freelances);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getFreelance = async (req, res) => {
    try {
        // .populate('skills').populate('jobs')
        const freelance = await Freelance.findById(req.params.id).populate('user');
        res.status(200).send(freelance);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}