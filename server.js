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

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`ATM System running on port ${PORT}`);
});  //

