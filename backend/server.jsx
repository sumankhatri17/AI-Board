const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");






// MongoDB Connection
mongoose.connect("mongodb://localhost:27017").then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Define Room Schema
const roomSchema = new mongoose.Schema({
  code: String,
  createdAt: { type: Date, default: Date.now },
  users: [String], // List of user names
});

const Room = mongoose.model("Room", roomSchema);


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies and authentication headers
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    credentials: true,
  },
});


io.on("connection", (socket) => {
  console.log("A user connected");

 
  // Create Room
  socket.on("createRoom", async (data) => {
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const room = new Room({ code: roomCode, users: [data.name] });
    await room.save();
    socket.join(roomCode);
    socket.emit("roomCreated", { roomCode });
    console.log(`Room ${roomCode} created`);
  });


  // Join Room
  socket.on("joinRoom", async (data) => {
    const { roomCode, name } = data;

    const room = await Room.findOne({ code: roomCode });
    if (room) {
      room.users.push(name);
      await room.save();
      socket.join(roomCode);
      io.to(roomCode).emit("userJoined", { name });
      console.log(`${name} joined room ${roomCode}`);
    } else {
      socket.emit("error", { message: "Invalid room code" });
    }
  });

  // Real-time Canvas Broadcast Example
  socket.on("drawStart", (data) => {
    socket.broadcast.emit("drawData", data);
  });

  socket.on("draw", (data) => {
    socket.broadcast.emit("drawData", data);
  });

  socket.on("drawEnd", (data) => {
    socket.broadcast.emit("drawData", data);
  });


    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

});



server.listen(5000, () => {
  console.log("Server listening on http://localhost:5000");
});
