const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// This tells the server to load your HTML files
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/atm.html');
});

app.get('/operator', (req, res) => {
    res.sendFile(__dirname + '/operator.html');
});

// This handles the instant messaging between devices
io.on('connection', (socket) => {
    console.log(`[SYSTEM] Device connected: ${socket.id}`);

    socket.on('atm_event', (data) => {
        io.emit('operator_update', data); 
    });

    socket.on('disconnect', () => {
        console.log(`[SYSTEM] Device disconnected: ${socket.id}`);
    });
});

server.listen(3000, () => {
    console.log('ATM System running on port 3000');
});
