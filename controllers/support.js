const sendMail = require("../middlewares/mail");

async function postSupport(req, res) {
    let text = req.body.text;
    console.log(req.user.email);
    text = "Hi, admin" + "\nName: " + req.user.name + "\nEmail: " + req.user.email + "\nNội dung: " + text
        + "\n Liên hệ với mail trên \nThân mến";
    let resp = await sendMail("Yêu cầu hỗ trợ kĩ thuật", text);
    return res.redirect("/support");
}

function getSupport(req, res) {
    if (!req.user) {
        return res.redirect("/account/login");
    }
    return res.render("support/support");
}

module.exports = {
    getSupport,
    postSupport
}