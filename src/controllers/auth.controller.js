const User = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

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
        const userSave = await newUser.save();
        res.status(201).send({ message: "User created", userSave });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.login = async (req, res) => {
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
            res.status(200).send({ message: "Successfuly logged in", auth: true, token: token });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};