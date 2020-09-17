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
    let roomHlsUrl = null;
    let roomSubtitleUrl = null;
    var roomPlaying = null;

    // Add socket.io events
    const messages = [];
    io.on("connection", socket => {
      connections.push(socket);

      // When new user connects
      socket.on("newUser", user => {
        const u = {
          id: socket.id,
          username: user.username,
          color: user.color,
          admin: user.admin
        };

        // Push user into array
        users.push(u);

        // Sent user list to clients
        io.emit("userList", users);

        // Only request state if an admin is in room
        const check = users.find(obj => obj.admin == true);
        if (check) {
          // request info from that admin
          io.to(check.id).emit("requestState", socket.id);
        }
      });

      // Send state to new client (only ran if admin is in room)
      socket.on("sendState", data => {
        var state = {
          roomHlsUrl,
          roomSubtitleUrl,
          roomTime: data.time,
          roomState: data.state,
          roomPlaying
        };
        io.to(data.id).emit("setState", state);
      });

      // On successful admin authentication find and give user admin
      socket.on("setAdmin", user => {
        const u = users.find(obj => obj.id == socket.id);
        u.admin = true;
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
        roomHlsUrl = url;
        io.emit("setStream", url);
      });

      socket.on("message", message => {
        io.emit("sendMessage", message);
      });

      socket.on("changeSubtitles", url => {
        roomSubtitleUrl = url;
        io.emit("setSubtitles", url);
      });

      socket.on("nowPlaying", playing => {
        roomPlaying = playing;
        io.emit("setNowPlaying", playing);
      });

      // On disconnect find and remove user from users array
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
