const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const socket = require("socket.io");
const crypto = require("crypto");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
const { json } = require("express");
config.dev = process.env.NODE_ENV !== "production";

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  await nuxt.ready();
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  if (nuxt.options.privateRuntimeConfig.ADMIN_TOKEN) {
    var adminToken = nuxt.options.privateRuntimeConfig.ADMIN_TOKEN;
    console.log(`Admin token: ${adminToken}`);
  } else {
    var adminToken = crypto.randomBytes(5).toString("hex");
    console.log(`Admin token: ${adminToken}`);
  }

  app.get("/api", (req, res, next) => {
    res.status(200).json({ success: true });
  });

  app.post("/auth", (req, res, next) => {
    try {
      if (req.body.code === adminToken) {
        res.status(200).json({ auth: true });
      } else {
        res.status(401).json({ auth: false });
      }
    } catch (err) {
      res.status(500).json({ err });
    }
  });

  app.get("/api/getEmotes", (req, res, next) => {
    try {
      const emoteFolder = "./static/emotes/";
      fs.readdir(emoteFolder, (err, files) => {
        var emotes = {};
        files.forEach(file => {
          var emote = file.replace(/(.*)\.[^.]+$/, "$1");
          emotes[emote] = `<img src=/emotes/${file}>`;
        });

        res.status(200).json(emotes);
        if (err) {
          throw new Error(err);
        }
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  app.get("/api/getEmoteList", (req, res, next) => {
    try {
      const emoteFolder = "./static/emotes/";
      fs.readdir(emoteFolder, (err, files) => {
        var emotes = [];

        files.forEach(file => {
          var emote = file.replace(/(.*)\.[^.]+$/, "$1");

          let path = `<img src=/emotes/${file}>`;

          var obj = { name: emote, emote: path };

          emotes.push(obj);
        });
        res.status(200).json(emotes);
        if (err) {
          throw new Error(err);
        }
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  const server = app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });

  const io = socket(server);

  const users = [];
  const messages = [];
  const connections = [];

  io.on("connection", socket => {
    connections.push(socket);
    console.log("new connection");
    socket.on("newUser", user => {
      users.push(user);
      console.log(`${user.username} has joined`);
    });

    socket.on("play", () => {
      io.emit("sendPlay");
    });

    socket.on("pause", () => {
      io.emit("sendPause");
    });

    socket.on("sync", currentTime => {
      io.emit("sendSync", currentTime);
    });

    socket.on("message", message => {
      io.emit("newMessage", message);
    });

    socket.on("authenticate", id => {
      if (id === adminId) {
        io.emit("isAdmin");
      } else {
        io.emit("incorrectAdmin");
      }
    });
  });
}
start();
