const mqtt = require('mqtt');
const io = require('socket.io')(http.createServer()); // Import Socket.IO from server

// ... (Rest of your MQTT client code)

mqttClient.on("message", (topic, message, packet) => {
    console.log("Received Message: " + message.toString() + "\nOn topic: " + topic);

    const data = JSON.parse(message.toString()); // Parse JSON data
    io.emit('sensorData', data); // Emit the data to connected clients
});

var mqttClient;

// Change this to point to your MQTT broker or DNS name
const mqttHost = "test.mosquitto.org";
const protocol = "mqtt";
const port = "1883";

function connectToBroker() {
  const clientId = "client" + Math.random().toString(36).substring(7);

  // Change this to point to your MQTT broker
  const hostURL = `${protocol}://${mqttHost}:${port}`;

  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  };

  mqttClient = mqtt.connect(hostURL, options);

  mqttClient.on("error", (err) => {
    console.log("Error: ", err);
    mqttClient.end();
  });

  mqttClient.on("reconnect", () => {
    console.log("Reconnecting...");
  });

  mqttClient.on("connect", () => {
    console.log("Client connected:" + clientId);
  });

  // Received Message
  mqttClient.on("message", (topic, message, packet) => {
    console.log(
      "Received Message: " + message.toString() + "\nOn topic: " + topic
    );
  });
}

function subscribeToTopic(topic) {
  console.log(`Subscribing to Topic: ${topic}`);

  mqttClient.subscribe(topic, { qos: 0 });
}

connectToBroker();
subscribeToTopic("devices/esp01/get/sensor_data");
