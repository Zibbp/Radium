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
    var connections = [];

    // Add socket.io events
    const messages = [];
    io.on("connection", socket => {
      connections.push(socket);

      socket.on("newUser", user => {
        const u = {
          id: socket.id,
          username: user.username,
          color: user.color,
          admin: user.admin
        };

        users.push(u);

        io.emit("userList", users);
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

      socket.on("changeSubtitles", url => {
        io.emit("setSubtitles", url);
      });

      socket.on("disconnect", () => {
        const u = users.find(obj => obj.id == socket.id);

        if (users.indexOf(u) > -1) {
          users.splice(users.indexOf(u), 1);
        }

        io.emit("userList", users);
      });
    });
  });
}
