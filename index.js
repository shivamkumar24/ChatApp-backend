const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], // It clear the method which is requested by server from this origin
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`); // it show random id for all the single chat

  socket.on("join_room", (data) => {
    socket.join(data); // it confirm the room no
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data); // it give message details
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id); // after every refresh the page user disconnect from the application
  });
});

server.listen(4500, () => {
  console.log("Server is running on port 4500");
});
