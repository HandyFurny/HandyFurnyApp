const express    = require('express');
const path = require('path');
const socketio = require('socket.io');


module.exports = (app) =>{
  const io = socketio(app);
  io.on('connection', function (socket) {
    console.log(`Connected to SOCKETIO ${socket.id}`);
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
      });
    // socket.on('chat message', function (data) {
    //   console.log(`Mensaje recibido, reenviando(back):`, data);

    // socket.broadcast.emit('chat message', {
    //     username: socket.id,
    //     message: data.message,
    //     owner: data.creator,
    //     name:data.username,
    //     events_id: data.events_id,
    //     score: data.score
    //   });
      
      
    // });

    });
};