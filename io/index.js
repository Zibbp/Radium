import http from "http";
import socketIO from "socket.io";

export default function() {
  this.nuxt.hook("render:before", renderer => {
    const server = http.createServer(this.nuxt.renderer.app);
    const io = socketIO(server);

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port, host) =>
      new Promise(resolve =>
        server.listen(
          process.env.PORT || 3000,
          process.env.HOST || "0.0.0.0",
          resolve
        )
      );
    // close this server on 'close' event
    this.nuxt.hook("close", async nuxt => {
      nuxt.server.close;
    });

    var users = [];

    // Add socket.io events
    const messages = [];
    io.on("connection", socket => {
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

      socket.on("changeStream", url => {
        io.emit("setStream", url);
      });

      socket.on("message", message => {
        io.emit("sendMessage", message);
      });

      socket.on("changeSubtitles", name => {
        io.emit("setSubtitles", name);
      });
    });
  });
}
