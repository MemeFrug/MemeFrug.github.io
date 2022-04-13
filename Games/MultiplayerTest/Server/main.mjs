import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer();
const io = new Server(httpServer, {
    serveClient: false,
    cors: {
        origin: "http://127.0.0.1:3000", // Used For Testing
        // origin: "http://memefrug.github.io/Games/MultiplayerTest/index.html"
    }
});

io.on("connection", (socket) => {
    console.log("Connected To Client");
});

httpServer.listen(8888);