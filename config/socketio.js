const express    = require('express');
const passport   = require('passport');
const path = require('path');
const socketio = require('socket.io');
const User = require('../models/User');
const Item = require('../models/Item');
const Chat = require('../models/Chat');


module.exports = (app) =>{
  const io = socketio(app);
  io.on('connection', function (socket) {
    console.log(`Connected to SOCKETIO ${socket.id}`);
    // socket.on('chat message', function(msg){
    //     io.emit('chat message', msg);
    //   });

    socket.on('chat message', function (data) {
      console.log(`Mensaje recibido, reenviando(back):`, data);
     //console.log(socket);
    // Chat.find("")
   
          // BUSCO SI  ya existe chat
    Chat.findOne( { $or : [{ $and : [ { _Buyer : data.user1_id  }, { _Seller : data.user2_id } ] },{ $and : [ { _Buyer : data.user2_id  }, { _Seller : data.user1_id } ] } ] } ,(err,doc)=>{
      if (err) {
        return res.redirect('/catalog/')
      }
      if (!doc) {
        // SI NO EXISTE CHAT ENTRE USUARIOS ME LO CREA
        console.log("no lo encontre")
        var frase=data.text;
        console.log(frase);
        var newChat= new Chat({
          messages:[frase],
          _itemID:data.itemID,
          _Buyer:data.user1_id,
          _Seller:data.user2_id
        });
        // guardo en BBDD  
        console.log("esto es mi mensaje "+data.text);
        //newChat.messages.push(data.text);
        newChat.save()
          .then(sentence =>{
            console.log("guarde el chat y esstoy dentro")
            console.log(newChat);
          })
          .catch(err => console.log(err))
    
      }else{
        // SI EXISTE CHAT ME AGREGA EL MENSAJE
      
      Chat.findByIdAndUpdate(doc._id, {$push: {messages: data.text}}, function (err, data){
          if (err )console.log(err)
          console.log("conseguido!!!")
      })
    }
    });
      
      io.emit('chat message', `${data.username1} : ${data.text}`);

    });

  });
};




   




