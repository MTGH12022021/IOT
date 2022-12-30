const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const countRoom = require("../models/countRoom");

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
                    const countUse = await countRoom.findOne({ name: "room" });
                    console.log(countUse);
                    let options = {
                        count1: countUse.count1, 
                        count2: countUse.count2,
                        count3: countUse.count3
                    }
                    options = encodeURI(JSON.stringify(options));
                    res.render("home/home", {
                        chat,
                        name: req.user.name,
                        options
                    });
                });
            });
    }
},);

module.exports = router;