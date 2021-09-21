const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        client: String,
        type: String,
        description: String,
        city: String,
        direction: String,
        dateOfDelivery: String,
        img : String,
        supplier: { type: Schema.Types.ObjectId, ref: "User" },
        status : String,
    },
    {
        timestamps: {
          createdAt: "created at",
          updatedAt: "updated at",
        },
    }
 );

 const Order = mongoose.model('Order', orderSchema);
 module.exports = Order;

