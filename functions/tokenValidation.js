require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

let tokenValidation = async (response, token, role) => {
    let userRole = role;
    let validationResult = {};
    if(!token){
        response.send({
            auth: false,
            token: null,
            message: "No token found",
        });
        return;
    }

    try {
        validationResult = jwt.verify(token, process.env.SECRET_WORD);
    }catch (error) {
        response.send({
            auth: false,
            token: null,
            message: "Invalid Token",
        })
        return; 
    }
    let user = await User.findById(validationResult.id, { password: 0 }).populate(
        "orders"
    );

    if (!user) {
        response.send({
            auth: false,
            message: "There´s no user with that credentials created"
        });
        return;
    };
    if (userRole != user.role){
        response.send({
            auth: false,
            message: "The role you are claiming its not correct, please select the correct role"
        });
        return;
    }
    return user;

};
module.exports = tokenValidation;