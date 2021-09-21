const express = require("express");
const supplierRoutes = express.Router();
const Provider = require("../models/User");
const Order = require("../models/Order");
const tokenValidation = require("../functions/tokenValidation");

supplierRoutes.get("/supplierHome", async (req, res) =>{
    let myToken = req.headers.token;
    let supplier = await tokenValidation(res, myToken, "supplier")
        if (!supplier){
            return;
        }
        res.send({
            supplier : supplier,
            auth: true
        })
    
});

supplierRoutes.get("/supplierOrder/:orderId", async (req, res)=>{
    let myToken = req.headers.token;
    let supplier = await tokenValidation(res, myToken, "supplier");
    if (!supplier){
    return;
}

    let id = req.params.orderId
    let order = await Order.findById(id)
        .then((foundOrder) =>{
            return foundOrder;
})
    res.send(order)
})

module.exports = supplierRoutes;