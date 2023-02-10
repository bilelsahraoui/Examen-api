const User = require("../models/user.model");
const Skill = require("../models/skill.model");
const Job = require("../models/job.model");
const Mission = require("../models/mission.model");

exports.getUser = (req, res) => {

    try{
        User.findById(req.params.id).populate('freelance').populate('company')
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                    message: "user not found"
                    })
                }
                res.send(user);
            })
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.updateUser = (req, res) => {
    try{
        User.findByIdAndUpdate(req.params.id, req.body)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                    message: "user not found"
                    })
                }
                user.save();
                User.findById(user._id).then(userupdated => {
                    res.send(userupdated);
                }
            )
        });
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.deleteUser = (req, res) => {
    try{
        User.findByIdAndDelete(req.params.id).then(user => {
            res.send(user)
        });
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.getSkill = (req, res) => {
    try{
        Skill.find({name: req.body.name})
            .then(skill => {
                if (!skill) {
                    return res.status(404).send({
                    message: "skill not found"
                    })
                }
                res.send(skill);
            });
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.createSkill = (req, res) => {
    try{
        Skill.create(req.body)
            .then(skill => {
                res.send(skill);
            });
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.deleteSkill = (req, res) => {
    try{
        Skill.findByIdAndDelete(req.params.id).then(skill => {
            res.send(skill)
        });
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.updateSkill = (req, res) => {
    try{

        Skill.findByIdAndUpdate(req.params.id, req.body).then(skill => {
            if (!skill) {
                return res.status(404).send({
                    message: "skill not found"
                })
            }});
            skill.save();
            Skill.findById(req.params.id).then(skill => {
                res.send(skill);
            }
    );
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.createJob = (req, res) => {
    try{
        Job.create(req.body)
            .then(job => {
                res.send(job);
            });
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.deleteJob = (req, res) => {
    try{
        Job.findByIdAndDelete(req.params.id).then(job => {
            res.send(job)
        });
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.updateJob = (req, res) => {
    try{

        Job.findByIdAndUpdate(req.params.id, req.body).then(job => {
            if (!job) {
                return res.status(404).send({
                    message: "Job not found"
                })
            }});
            job.save();
            Job.findById(req.params.id).then(job => {
                res.send(job);
            }
    );
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.getMission = (req, res) => {
    try{
        Mission.findById(req.params.id).populate('freelancer')
            .then(mission => {
                if (!mission) {
                    return res.status(404).send({
                    message: "mission not found"
                    })
                }
                res.send(mission);
            });
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}