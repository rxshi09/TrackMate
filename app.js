const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('send-location', (data) => {
        io.emit('receive-location', { id: socket.id, ...data });
    });

    socket.on('disconnect', () => {
        io.emit('user-disconnected', socket.id);
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(3000,'0.0.0.0', () => {
    console.log('App is running.................');
});