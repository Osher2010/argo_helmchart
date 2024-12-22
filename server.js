const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Serve static files from "public" directory

io.on('connection', (socket) => {
    console.log('A user connected');

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A new user has joined the chat');

    // Handle chat messages
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    });

    // Broadcast when a user disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});