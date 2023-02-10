const User = require("../models/user.model");
const mailerController = require("./mailer.controller");
const bcrypt = require("bcrypt");

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
            firstName: req.body.firstName ? req.body.firstName : userModified.firstName,
            lastName: req.body.lastName ? req.body.lastName : userModified.lastName,
            address: req.body.address ? req.body.address : userModified.address,
            postalCode: req.body.postalCode ? req.body.postalCode : userModified.postalCode,
            phone: req.body.phone ? req.body.phone : userModified.phone,
            email: req.body.email ? req.body.email : userModified.email,
            password: req.body.password ? req.body.password : userModified.password,
        });
        userModified.save();
        res.status(200).send(userModified);
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}

exports.forgotPassword = async (req, res) => {
    function generateRandomPassword(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    try{
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            res.status(404).send({ message: "User not found" });
        }else{
            const newPassword = generateRandomPassword(10);
            const mail = {
                subject: 'Here you go!',
                text: 'This is your new password!',
                html: `<h1>This is your new password :</h1><p>${newPassword}</p>`
            };
            mailerController.sendMail(req.body.email, mail, false);
            user.password = newPassword;
            user.save();
            res.status(200).send({ message: "New password sent to your email" });
        }
    }catch(err){
        res.status(500).send({ message: err.message });
    }
}