const sendMail = require("../middlewares/mail");
const client = require("../configs/mqtt");
const topicPush = "20127430/getReqTemp"

async function postSupport(req, res) {
    const text = "Hi, admin" + "\nName: " + req.user.name + "\nEmail: " + req.user.email + "\nNội dung: " + req.body.text
        + "\nLiên hệ với mail trên \nThân mến";
    let resp = await sendMail("Yêu cầu hỗ trợ kĩ thuật", text);
    return res.redirect("/support");
}

async function postSupportBuzzer(req, res) {
    client.publish(topicPush, "offBuzzer", { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
    let text = req.body.text;
    console.log(req.user.email);
    text = "Hi, admin" + "\nName: " + req.user.name + "\nEmail: " + req.user.email + "\nNội dung: buzzer kêu sai yêu cầu hỗ trợ"
        + "\nLiên hệ với mail trên \nThân mến";
    let resp = await sendMail("Yêu cầu hỗ trợ kĩ thuật buzzer", text);
    return res.redirect("/support");
}


function getSupport(req, res) {
    if (!req.user) {
        return res.redirect("/account/login");
    }
    return res.render("support/support", {
        name: req.user.name
    });
}

module.exports = {
    getSupport,
    postSupport,
    postSupportBuzzer
}