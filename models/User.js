const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name : String,
        lastname : String,
        email : String,
        phone : String,
        city : String,
        password : String,
        role : String,
        guild : String,
        orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    },
    {
        timestamps: {
          createdAt: "created at",
          updatedAt: "updated at",
        },
      }
);

const User = mongoose.model('User', userSchema);
module.exports = User;