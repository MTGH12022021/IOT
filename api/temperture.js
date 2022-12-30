const client = require("../configs/mqtt");
const topic = "20127553/temp";
const sendMail = require("../middlewares/mail");

async function get(req, res) {
    client.subscribe("20127430/temp", () => {
        client.publish("20127430/getReqTemp", "getTemperture", { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    });

    return new Promise((resolve, reject) => {
        client.on('message', function (topic, message) {
            console.log(message.toString());
            return resolve(JSON.parse(message.toString()));
        });
    }).then(async (resolve) => {
        console.log(resolve);
        if (resolve >= 50) {
            const text = "Hi, admin" + "\nNội dung: Cháy rồi chạy đi" + "\nThân mến";
            let resp = await sendMail("Cảnh báo cháy", text);
        }
        return res.status(200).json({
            "temp": resolve,
            status: 200,
        });
    });
}

module.exports = {
    get
}