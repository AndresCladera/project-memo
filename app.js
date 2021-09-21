require("dotenv").config();
const { response } = require("express");
const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const AuthRoutes = require("./routes/authentication");
const ClientRoutes = require("./routes/client");
const SupplierRoutes = require("./routes/supplier");
// const cors = require("cors");

mongoose
    .connect(
        `mongodb+srv://Andres:ProjectPassword@cluster0.dd4fs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("READY FOR SOME DELIVERY 2!");
    })
    .catch((error) => {
        console.log(error);
    });


// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", AuthRoutes);
app.use("/", ClientRoutes);
app.use("/", SupplierRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

