import io from "socket.io-client";
const socket = io(process.env.BASE_URL);

export default socket;
