const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countRoom = new Schema(
    {
        name: { type: String, maxlength: 255 },
        count1: { type: Number  },
        count2: { type: Number },
        count3: { type: Number } 
    },
{ collection: "countRoom" }
);

module.exports = mongoose.model("countRoom", countRoom);

