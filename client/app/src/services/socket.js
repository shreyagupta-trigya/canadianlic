import { io } from "socket.io-client";

let socket;

const socketService = {
  connect() {
    if (!socket) {
      socket = io("http://localhost:3000", {
        transports: ["websocket", "polling"],
        pingTimeout: 60000,
        pingInterval: 25000,
      });

      socket.on("connect", () => {
        console.log("WebSocket connected:", socket.id);
      });

      socket.on("disconnect", (reason) => {
        console.warn("Disconnected:", reason);
      });

      socket.on("connect_error", (error) => {
        console.error("Connection error:", error.message);
      });
    }
  },
  emit(event, data) {
    if (socket) {
      socket.emit(event, data);
    } else {
      console.warn("Socket not connected!");
    }
  },
  on(event, callback) {
    if (socket) {
      socket.on(event, callback);
    }
  },
  disconnect() {
    if (socket) {
      console.log("🔌 Disconnecting WebSocket...");
      socket.disconnect();
      socket = null;
    }
  },
};

export default socketService;
