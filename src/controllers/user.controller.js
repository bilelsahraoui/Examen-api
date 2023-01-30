const User = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('freelance');
        res.status(200).send(user);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.modifyUser = async (req, res) => {
    try{
        const userModified = await User.findByIdAndUpdate(req.userToken.id, {
            
        });
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}