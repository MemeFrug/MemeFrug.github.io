import { createServer } from "http";
import { Server } from "socket.io";
import { readFileSync } from "fs";

const httpServer = createServer({
    key: readFileSync("./Certificate/openssl.key"),
    cert: readFileSync("./Certificate/openssl.crt")
});

const io = new Server(httpServer, {
    serveClient: false,
    cors: {
        // origin: "http://127.0.0.1:3000", // Used For Testing
        origin: "https://memefrug.github.io/" // Used For Production
    }
});

io.on("connection", (socket) => {
    console.log("Connected To Client:", socket.id);
});

httpServer.listen(8081);