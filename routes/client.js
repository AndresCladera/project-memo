const express = require("express");
const clientRoutes = express.Router();
const tokenValidation = require("../functions/tokenValidation")

const Client = require("../models/User");
const Order = require("../models/Order");

clientRoutes.get("/clientHome", async (req, res) => {
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "client");
    if (!user) {
        res.send({
            message: "user not found",
            token: null,
            auth: false
        })
        return;
    }
    console.log(user.orders);
    res.send({
        user: user,
        auth: true
    })

})

clientRoutes.get("/clientOrder/:idOrder", async (req, res) => {
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "client");
    if (!user) {
        return;
    }
    let id = req.params.idOrder;
    let order = await Order.findById(id)
        .then((foundOrder) => {
            return foundOrder;
        })
        
    res.send(order);
})

clientRoutes.post("/orderRequest", async (req, res) =>{
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "client");
    if(!user){
        return;
    }
    let client = user.name;
    let orderType = req.body.type;
    let orderDescription = req.body.description
    let orderCity = user.city;
    let orderDirection = req.body.direction;
    let orderDateOfDelivery = req.body.dateOfDelivery;
    let order = await Order.create({
        client : client,
        type : orderType,
        description : orderDescription,
        city : orderCity,
        direction : orderDirection,
        dateOfDelivery : orderDateOfDelivery,
        status: "pending"
    })
    .then((newOrder) =>{
        return newOrder
    }).catch((error)=>{
        console.log("we have the next", error)
    })
    Client.findByIdAndUpdate(user._id, { $push: { orders: order._id } })
    .then((updatedUserWithOrder) =>{
    })
    res.send({
        order: order,
        auth: true
    })
})

clientRoutes.delete("/deleteOrder/:idOrder", async (req, res) =>{
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "client");
    if(!user){
        return;
    }
    let id = req.params.idOrder;
    let order = Order.findByIdAndDelete(id).then((deletedOrder)=>{
        return deletedOrder;
    })
    res.send({
        message : `the order ${order.description} has been deleted successfully`
    });

})

clientRoutes.put("/updateOrder/:idOrder", async (req, res) =>{
    let myToken = req.headers.token;
    let user = await tokenValidation(res, myToken, "client");
    if(!user){
        return;
    }
    let orderDescription = req.body.description
    let orderDirection = req.body.direction;
    let orderDateOfDelivery = req.body.dateOfDelivery;
    let id = req.params.idOrder;
    let order = await Order.findByIdAndUpdate(id, {
        description : orderDescription,
        direction : orderDirection,
        dateOfDelivery : orderDateOfDelivery
     })
    .then((updatedOrder)=>{
        return updatedOrder;
    })
    res.send({
        message: `the order ${order.description} has been updated successfully`
    })
})

module.exports = clientRoutes;