const express = require("express");
const mqtt = require("mqtt");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

// MQTT Client setup
const mqttClient = mqtt.connect("mqtt://185.183.182.195"); // Use your MQTT broker URL here

mqttClient.on("connect", () => {
  console.log("MQTT Client connected");
  mqttClient.subscribe("topic_1"); // Subscribe to the desired MQTT topic
});

mqttClient.on("message", (topic, message) => {
  console.log("Received Message:", message.toString(), "On topic:", topic);
  io.emit("mqttMessage", { topic, message: message.toString() }); // Emit the MQTT message to connected clients
});

// Express routes
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(4000, () => {
  console.log("Server listening on port 3000");
});
