const login = require("sahu-fca");
const fs = require("fs");
const http = require("http");

const appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));

http.createServer((req, res) => res.end("Bot is alive")).listen(process.env.PORT || 3000);

login({ appState }, (err, api) => {
  if (err) return console.error(err);

  console.log("Bot running...");
  api.setOptions({ listenEvents: false, selfListen: false });

  api.listenMqtt((err, message) => {
    if (err) return console.error(err);
    if (message.type === "message" && message.body) {
      api.sendMessage(message.body, message.threadID);
    }
  });
});
