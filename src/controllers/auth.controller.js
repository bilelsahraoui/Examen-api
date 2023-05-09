const User = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const mailerController = require("./mailer.controller");

exports.register = async (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        postalCode: req.body.postalCode,
        phone: req.body.phone,
        password: req.body.password,
        email: req.body.email,
        isAdmin: false,
    });

    try {
        const mail = {
            subject: 'Welcome to our platform!',
            text: 'Thank you for registering on our platform!',
            html: '<h1>Welcome to Freelance</h1><p>Thank you for registering on our platform!</p>'
        };
        const userSave = await newUser.save();
        mailerController.sendMail(req.body.email, mail, true);
        res.status(201).send({ message: "User created", userSave });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const resUser = await User.findOne({ email: req.body.email }).populate('freelance').populate('company');
    User.findOne({ email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if (!isPasswordValid) {
                return res.status(401).send({ message: "Password is not valid", auth: false});
            }

            let token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)
            res.status(200).send({ message: "Successfuly logged in", auth: true, token: token, user: resUser });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};