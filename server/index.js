const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const socket = require("socket.io");
const crypto = require("crypto");
const cors = require("cors");
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

  app.get("/api", (req, res) => {
    res.status(200).json({ success: true });
  });

  app.post("/auth", (req, res) => {
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

    socket.on("newUser", user => {
      users.push(user);
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

    socket.on("testDemo", () => {
      console.log("pogchamp");
    });
  });
}
start();
