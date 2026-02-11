import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { Socket } from "dgram";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    socket.on ("join-room", (roomId: string) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    socket.on ("draw", (data) => {
        socket.to(data.roomId).emit("draw", data);
    });

    socket.on ("disconnect", () => {
        console.log ("User disconnected: ", socket.id);
    });
});

server.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});