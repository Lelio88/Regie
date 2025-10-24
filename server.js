// server.js — simple signaling server
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));


// Keep a map of sockets that identify themselves as 'dashboard' or 'phone'
let dashboardSocketId = null;


io.on('connection', socket => {
    console.log('socket connected', socket.id);


    socket.on('identify', (role) => {
        console.log('identify', socket.id, role);
        if (role === 'dashboard') dashboardSocketId = socket.id;
        socket.role = role;


        // notify dashboard of new phone
        if (role === 'phone' && dashboardSocketId) {
            io.to(dashboardSocketId).emit('phone-joined', { phoneId: socket.id });
        }
    });


    socket.on('offer', ({ targetId, sdp }) => {
        io.to(targetId).emit('offer', { from: socket.id, sdp });
    });


    socket.on('answer', ({ targetId, sdp }) => {
        io.to(targetId).emit('answer', { from: socket.id, sdp });
    });


    socket.on('ice-candidate', ({ targetId, candidate }) => {
        io.to(targetId).emit('ice-candidate', { from: socket.id, candidate });
    });


    socket.on('disconnect', () => {
        console.log('disconnect', socket.id);
        if (socket.id === dashboardSocketId) {
            dashboardSocketId = null;
        } else {
            // notify dashboard that phone left
            if (dashboardSocketId) io.to(dashboardSocketId).emit('phone-left', { phoneId: socket.id });
        }
    });
});


const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log('Signaling server running on port', PORT));