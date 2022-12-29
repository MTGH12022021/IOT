const wrapedSendMail = require("../configs/mail");
const privateValue = require("../configs/dotenv");

const sendMail = async (subject ,text) => {
    var mailOptions = {
        from: privateValue.mailUserName,
        to: privateValue.mailFormAddress,
        subject: subject,
        text: text
    };
    let resp = await wrapedSendMail(mailOptions);
    console.log(resp)
    // log or process resp;
    return resp;
};

module.exports = sendMail;