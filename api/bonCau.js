
const client = require("../configs/mqtt");
const topic = "20127553/bonCau";

async function get(req, res) {
    client.subscribe("20127553/bonCau", () => {
        client.publish("20127553/getReqBonCau", "getBonCau",{ qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    });

    return new Promise((resolve, reject) => {
        client.on('message', function (topic, message) {
            return resolve(JSON.parse(message.toString()));
        });
    }).then((resolve) => {
        return res.status(200).json({
            room: resolve,
            status: 200,
        });
    });
}

module.exports = {
    get
}