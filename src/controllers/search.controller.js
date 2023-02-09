const User = require('../models/user.model');
const Freelancer = require('../models/freelance.model');

exports.searchFreelance = async (req, res) => {
    try
    { 
        const freelancers = await Freelancer.find().populate('user').populate('skills').populate('jobs');
        const results = freelancers.filter(freelancer => {
            if(req.body.skills){
                const skills = freelancer.skills.map(skill => skill.name);
                const skillsMatch = req.body.skills.every(skill => skills.includes(skill.name));
                if(!skillsMatch){
                    return false;
                }
            }
            if(req.body.jobs){
                const jobs = freelancer.jobs.map(job => job.name);
                const jobsMatch = req.body.jobs.every(job => jobs.includes(job.name));
                if(!jobsMatch){
                    return false;
                }
            }
            if(req.body.minExperience){
                if(freelancer.yearsOfExperience < req.body.minExperience){
                    return false;
                }
            }
            if(req.body.maxExperience){
                if(freelancer.yearsOfExperience > req.body.maxExperience){
                    return false;
                }
            }
            if(req.body.minPrice){
                if(freelancer.dailyPrice < req.body.minPrice){
                    return false;
                }
            }
            if(req.body.maxPrice){
                if(freelancer.dailyPrice > req.body.maxPrice){
                    return false;
                }
            }
            return true;
        });

        res.status(200).send(results);
    }
    catch(err)
    {
        res.status(500).send({ message: err.message });
    }
}

exports.searchByString = async (req, res) => {
    try
    {
        const searchString = req.body.searchString;
        const freelancers = await Freelancer.find().populate('user').populate('skills').populate('jobs');

        // const arr = searchString.split(' ');

        const finalResults = freelancers.filter(freelancer => {
            const skills = freelancer.skills.map(skill => skill.name);
            const jobs = freelancer.jobs.map(job => job.name);
            const skillsMatch = skills.some(skill => skill.includes(searchString));
            const jobsMatch = jobs.some(job => job.includes(searchString));
            const firstnameMatch = searchString.includes(freelancer.user.firstName);
            const lastnameMatch = searchString.includes(freelancer.user.lastName);
            const addressMatch = searchString.includes(freelancer.user.address);
            if(skillsMatch || jobsMatch || firstnameMatch || lastnameMatch || addressMatch){
                return true;
            }
            return false;
        });

        res.status(200).send(finalResults);
    }
    catch(err)
    {
        res.status(500).send({ message: err.message });
    }

}