const login = require("sahu-fca");
const http = require("http");

const appState = JSON.parse(process.env.APPSTATE);

http.createServer((req, res) => res.end("ok")).listen(process.env.PORT || 3000);

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
