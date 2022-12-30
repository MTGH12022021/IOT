const countRoom = require("../models/countRoom");
const client = require("../configs/mqtt");
const topic = "20127553/bonCau";

async function get(req, res) {
    client.subscribe("20127553/bonCau", () => {
        client.publish("20127553/getReqBonCau", "getBonCau", { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    });

    return new Promise((resolve, reject) => {
        client.on('message', function (topic, message) {
            return resolve(JSON.parse(message.toString()));
        });
    }).then(async (resolve) => {
        countRoom.find({ name: "room" })
            .then(async function (data) {
                let temp1 = data[0].count1 + resolve.countUse1;
                let temp2 = data[0].count2 + resolve.countUse2;
                let temp3 = data[0].count3 + resolve.countUse3;
                await countRoom.updateMany({ name: "room" }, {
                    count1: temp1,
                    count2: temp2,
                    count3: temp3
                })

            })
            .catch((err) => {
                console.log(err);
            })
        return res.status(200).json({
            room: resolve,
            status: 200,
        });
    });
}

module.exports = {
    get
}