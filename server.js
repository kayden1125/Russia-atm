const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/atm.html');
});

app.get('/operator', (req, res) => {
    res.sendFile(__dirname + '/operator.html');
});

io.on('connection', (socket) => {
    console.log(`[SYSTEM] Device connected: ${socket.id}`);

    socket.on('atm_event', (data) => {
        io.emit('operator_update', data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`ATM System running on port ${PORT}`);
});
