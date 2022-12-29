const mqtt = require('mqtt')


const connectUrl = "mqtt://test.mosquitto.org"
const client = mqtt.connect(connectUrl)

const topic = '20127553/temp'



const topicPush = '20127553/mssv'

client.publish(topicPush, 'helolo', { qos: 0, retain: false }, (error) => {
    if (error) {
        console.error(error)
    }
})

client.on("message", (topic, payload) => {
    console.log('Received Message:', topic, payload.toString());
    client.end();
})

client.publish(topicPush, 'hihi', { qos: 0, retain: false }, (error) => {
    if (error) {
        console.error(error)
    }
})






