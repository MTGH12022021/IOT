const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Chat = new Schema(
    {
        name: { type: String, maxlength: 255 },
        comment: { type: String, maxlength: 255 },
        time: { type: String, maxlength: 255 },
    },
    { collection: "chat" }
);


module.exports = mongoose.model("Chat", Chat);
