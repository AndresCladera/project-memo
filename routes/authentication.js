const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const salt = bcrypt.genSaltSync(10);

authRoutes.post("/login", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    const hashPassword = await bcrypt.hashSync(password, salt);

    let user = await User.findOne({
        email: email
    }).then((foundUser) => {
        return foundUser;
    })
    if (!user) {
        res.send({
            message: "user not found or doesn´t exist",
            token: null,
        })
        return;
    }

    let correctPassword = await bcrypt.compare(password, hashPassword);
    if (correctPassword == false) {
        res.send({
            auth: false,
            token: null,
            message: "Incorrect password."
        });
        return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_WORD, { expiresIn: 300000000 })

    res.send({
        newToken: token,
        role: user.role,
        message: `the ${user.role} ${user.name} has been loged correctly`,
    });
    
})

authRoutes.post("/signup", async (req, res) => {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    const city = req.body.city;
    const password = req.body.password;
    const role = req.body.role;

    if (!email || !password) {
        res.send({
            message: "please complete the missing fields",
            token: null
        });
        return;
    }
    if (password.length < 8) {
        res.send({
            message: "password must contain at least 8 characters",
            token: null
        });
        return
    }

    let foundUser = await User.findOne({ email: email, })
        .then((repeatedEmail) => {
            return repeatedEmail;
        });
    if (foundUser != null) {
        res.send({
            message: "that email is already registered",
            token: null
        });
        return;
    }

    let newUser = await User.create({
        name : name,
        lastname : lastname,
        email : email,
        phone : phone,
        city : city,
        password : password,
        role : role
    }).then((createdUser) => {
        return createdUser;
    })
     .catch((error) => {
        res.send(`we have the following errors ${error}`)
        return;
    })
    // console.log(newUser);

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.SECRET_WORD, { expiresIn: 300000000 })

    res.send({
        role : newUser.role,
        newToken: token,
        message: "the user has been created succesfully"
    });

});

module.exports = authRoutes;