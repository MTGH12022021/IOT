const mqtt = require('mqtt')


const connectUrl = "mqtt://test.mosquitto.org"
const client = mqtt.connect(connectUrl)


client.on('connect', () => {
    console.log('Connected')
})

// client.subscribe([topic], () => {
//     console.log(`Subscribe to topic '${topic}'`)
// })

module.exports = client;
