const Company = require("../models/company.model");
const Freelance = require("../models/freelance.model");
const Mission = require("../models/mission.model");
const mailerController = require("./mailer.controller");
const User = require("../models/user.model");

exports.createMission = async (req, res) => {
    try {
        const companyId = await Company.findOne({user: req.userToken.id});
        const newMission = new Mission({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            date_end: new Date(), 
            // req.body.date_end,
            date_start: new Date(),
            // req.body.date_start,
            totalPrice: req.body.totalPrice,
            skills: req.body.skills,
            company: companyId._id,
        });
        const missionSave = await newMission.save();
        res.status(201).send({ message: "Mission created", missionSave });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllMissions = async (req, res) => {
    try {
        const missions = await Mission.find().populate('company').populate('freelancers');
        res.status(200).send(missions);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getMissionById = async (req, res) => {
    try {
        const mission = await Mission.findById(req.params.id).populate('company');
        res.status(200).send(mission);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.proposer = async (req, res) => {
    try {
        const freelancerId = req.body.freelancerId;
        const freelancer = await Freelance.findById(freelancerId).populate('user');
        const mission = await Mission.findById(req.body.missionId).populate('freelancers');
        const mail = {
            subject: 'Hey wake up, you just got proposed!',
            text: 'You got proposed!',
            html: '<h1>Mission</h1></h1><p>You got a mission!</p>'
        }

        if(mission.freelancers.length <= 3){
            if(mission.freelancers.find(freelance => freelance.freelance == freelancerId)){
                return res.status(400).send({ message: "Freelancer already proposed" });
            }else{
                mission.freelancers.push({freelance: freelancerId, isAccepted: null});
            }
            mission.save();
            mailerController.sendMail(freelancer.user.email, mail, false)
            res.status(200).send({ message: "Freelancer proposed"});
        }else{
            return res.status(400).send({ message: "You can't propose more than 3 freelancers" });
        }
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.decide = async (req, res) => {
    try{
        const freelancerId = req.body.freelancerId;
        const mission = await Mission.findById(req.body.missionId).populate('freelancers').populate('company');
        const companyUser = await User.findOne({company: mission.company._id});
        const missionDecision = await mission.freelancers.find(freelance => freelance.freelance == freelancerId);
        const mail = {
            subject: 'Your proposal got an answer!',
            text: 'You got an answer!',
            html: '<h1>Mission</h1></h1><p>Answer</p>'
        }

        Freelance.findOne({user: req.userToken.id}).then(freelance => {
            if(freelance){
                if(freelance._id == freelancerId){
                    missionDecision.isAccepted = req.body.isAccepted;
                    if(req.body.isAccepted == false){
                        const newFreelancers = mission.freelancers.filter(freelance => freelance.freelance != freelancerId);
                        mission.freelancers = newFreelancers;
                    }
                    mission.save();
                    mailerController.sendMail(companyUser.email, mail, false);
                    return res.status(200).send({ message: req.body.isAccepted == true ? "Freelancer accepted the mission" : "Freelancer declined the mission" });
                }else{
                    return res.status(400).send({ message: "You are not the freelancer" });
                }
            }
        });
    }
    catch(err){
        res.status(500).send({ message: err.message });
    }
}