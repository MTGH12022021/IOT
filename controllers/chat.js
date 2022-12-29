const Chat = require("../models/Chat");

function getChat(req, res) {
    if (!req.user) {
        return res.redirect("/account/login");
    }
    Chat.find() // find tất cả các data
        .lean()
        .limit(10)
        .sort({ $natural: -1 })
        .exec((err, chat) => {
            Chat.countDocuments(async (err, count) => {
                // đếm để tính có bao nhiêu trang
                if (err) return next(err);
                res.render("chat/chat", {
                    chat, 
                    name: req.user.name
                });
            });
        });
}

async function postChat(req, res) {
    if (!req.user) {
        return res.redirect("/account/login");
    }
    const comment = req.body.comment;
    const date = new Date() // today, now

    // Timezone zero UTC offset
    console.log(date.toLocaleString("en-US", { timeZone: "America/New_York" })) // YYYY-MM-DD

    // Timezone of User Agent

    const chat = new Chat({
        name: req.user.name,
        comment: comment,
        time: date.toLocaleString("en-US", { timeZone: "America/New_York" })
    });
    await chat.save();
    res.redirect("/chat");
}

module.exports = {
    getChat,
    postChat
}