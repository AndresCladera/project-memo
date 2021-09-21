const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guildSchema = new Schema(
    {
        name : String
    },
    {
        timestamps: {
          createdAt: "created at",
          updatedAt: "updated at",
        },
    }
);

const Guild = mongoose.model('Guild', guildSchema);
module.exports = Guild;