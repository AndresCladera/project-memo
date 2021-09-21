require("dotenv").config();
const mongoose = require('mongoose');
const Guild = require("./models/Guild")
const User = require("./models/User")
const Order = require("./models/Order")
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

mongoose
    .connect(
        `mongodb+srv://Andres:ProjectPassword@cluster0.dd4fs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("READY FOR SOME DELIVERY!");
    })
    .catch((error) => {
        console.log(error);
    });

let users = [
    {
        name: "John",
        lastname: "Smith",
        email: "johns@email.com",
        phone: "654345678",
        city: "Madrid",
        password: "123456789",
        role: "client",
        orders: ["613a524e87823839dbe6545e", "613a524e87823839dbe6545f"],
        _id: "613a19134116241dcf4a2a42"
    },
    {
        name: "Michael",
        lastname: "González",
        email: "mg@email.com",
        phone: "654345678",
        city: "Madrid",
        password: "123456789",
        role: "client",
        orders: ["613a524e87823839dbe65460"],
        _id: "613a19144116241dcf4a2a43"
    },
    {
        name: "Carmen",
        lastname: "San Diego",
        email: "carsan@email.com",
        phone: "654345678",
        city: "Barcelona",
        password: "123456789",
        role: "client",
        orders: ["613a524e87823839dbe65461", "613a524e87823839dbe65462"],
        _id: "613a19144116241dcf4a2a44"
    },
    {
        name: "Eduardo",
        lastname: "Gutierrez",
        email: "edu@email.com",
        phone: "654345678",
        city: "Madrid",
        password: "123456789",
        role: "supplier",
        orders: ["613a524e87823839dbe6545e", "613a524e87823839dbe6545f", "613a524e87823839dbe65460"],
        _id: "613a498de748752e7a3b4284"
    },
    {
        name: "José",
        lastname: "Rodríguez",
        email: "joserod@email.com",
        phone: "654345678",
        city: "Barcelona",
        password: "123456789",
        role: "supplier",
        orders: ["613a524e87823839dbe65461"],
        _id: "613a498de748752e7a3b4285"
    },
    {
        name: "Joan",
        lastname: "Laporta",
        email: "laporta@email.com",
        phone: "654345678",
        city: "Barcelona",
        password: "123456789",
        role: "supplier",
        orders: ["613a524e87823839dbe65462"],
        _id: "613a498de748752e7a3b4286"
    },
]

let orders = [
    {
        client: "johns@gmail.com",
        type: "tech",
        description: "Iphone Xs Max",
        city: "Madrid",
        direction: "Calle de la Paloma 15",
        dateOfDeliver: "11/12/2021",
        status:"pending",
        supplier: "613a498de748752e7a3b4284",
        _id: "613a524e87823839dbe6545e"
    },
    {
        client: "johns@gmail.com",
        type: "tech",
        description: "Macbook Pro",
        city: "Madrid",
        direction: "Calle Tuhermana 69",
        dateOfDeliver: "20/11/2021",
        status:"pending",
        supplier: "613a498de748752e7a3b4284",
        _id: "613a524e87823839dbe6545f"
    },
    {
        client: "mg@email.com",
        type: "tech",
        description: "Samsung Galaxy s200",
        city: "Madrid",
        direction: "Calle Orense 12",
        dateOfDeliver: "30/09/2021",
        status:"pending",
        supplier: "613a498de748752e7a3b4284",
        _id: "613a524e87823839dbe65460"
    },
    {
        client: "carsan@email.com",
        type: "cars",
        description: "Testa Cybertruck",
        city: "Barcelona",
        direction: "Carrer Messi 10",
        dateOfDeliver: "25/12/2021",
        status:"pending",
        supplier: "613a498de748752e7a3b4285",
        _id: "613a524e87823839dbe65461"
    },
    {
        client: "carsan@email.com",
        type: "clothes",
        description: "Skinny Jeans",
        city: "Barcelona",
        direction: "Av. Diagonal 215",
        dateOfDeliver: "15/09/2021",
        status:"pending",
        supplier: "613a498de748752e7a3b4286",
        _id: "613a524e87823839dbe65462"
    }
]

let guilds = [
    {
        name: "tech"
    },
    {
        name: "cars"
    },
    {
        name: "clothes"
    }
]

console.log("In the seeds are the following users", users);


User.deleteMany()
    .then(() => {
        console.log(`Users deleted.`);
        return User.create(users);
    })
    .then((createdUsers) => {
        console.log(
            `${createdUsers.length} users have been created with the following names:`
        );
        createdUsers.forEach((user) => {
            console.log(user.name);
        });
    }).then(() => {
        Order.deleteMany()
            .then(() => {
                console.log(`Order deleted.`);
                return Order.create(orders);
            })
            .then((createdOrders) => {
                console.log(
                    `${createdOrders.length} orders have been created with the following id´s:`
                );
                createdOrders.forEach((order) => {
                    console.log(order._id);
                });
            })
            .then(() => {
                Guild.deleteMany()
                    .then(() => {
                        console.log(`Guilds deleted.`);
                        return Guild.create(guilds);
                    })
                    .then((createdGuilds) => {
                        console.log(
                            `${createdGuilds.length} guilds have been added with the following id´s:`
                        );
                        createdGuilds.forEach((guild) => {
                            console.log(guild._id);
                        });
                    })
                    .then(() => {
                        mongoose.disconnect();
                        console.log("WE R OUT BABYY.");
                    })
                    .catch((error) => {
                        console.log("There is an error:");
                        console.log(error);
                    });
            })

    })
    .catch((error) => {
        console.log("There is an error:");
        console.log(error);
    });

