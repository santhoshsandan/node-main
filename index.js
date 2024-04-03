const socket = io();
const messageTextArea = document.querySelector("#message");

socket.on("mqttMessage", (data) => {
    console.log("Received MQTT message:", data);
    messageTextArea.value += `${data.topic}: ${data.message}\n`;
});

const subscribeBtn = document.querySelector("#subscribe");
subscribeBtn.addEventListener("click", () => {
    const topic = document.querySelector("#topic").value.trim();
    console.log("Subscribing to Topic:", topic);
    socket.emit("subscribe", topic);
});

const unsubscribeBtn = document.querySelector("#unsubscribe");
unsubscribeBtn.addEventListener("click", () => {
    const topic = document.querySelector("#topic").value.trim();
    console.log("Unsubscribing from Topic:", topic);
    socket.emit("unsubscribe", topic);
});
