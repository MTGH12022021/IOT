const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");


router.get("/", async function (req, res) {
    if (!req.user) {
        res.redirect("/account/login");
    }
    else {
        Chat.find() // find tất cả các data
            .lean()
            .limit(4)
            .sort({ $natural: -1 })
            .exec((err, chat) => {
                Chat.countDocuments(async (err, count) => {
                    // đếm để tính có bao nhiêu trang
                    if (err) return next(err);
                    res.render("home/home", {
                        chat,
                        name: req.user.name
                    });
                });
            });
    }
},);

module.exports = router;