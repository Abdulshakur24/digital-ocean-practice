import { io } from "socket.io-client";

function connectToSocket() {
  return io(process.env.REACT_APP_BACKEND_URL as string, {
    transports: ["websocket", "polling"],
  });
}

export default connectToSocket;
