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
    console.log("8=================D")
  

          Item.findById(data.itemID)
          .populate("_creator")
          .then(items =>{
            const updates = {
              _ownerBuyer   : data._id,
              _userSeller   : data._creator._id,
              _itemID       : data.itemID,
              messages      : messages.push(data.text),
            };
        
            // Item.findByIdAndUpdate(req.params.id, updates, (err, item) => {
            //   if (err) {
            //     return res.redirect('/catalog/'+req.params.id+'/edit')
            //   }
            //   if (!item) {
            //     return next(new Error('404'));
            //   }
            //   return res.redirect('/catalog/'+req.params.id);
            // });
          })
          .catch  (err =>console.log('error'))


          console.log(data)
          io.emit('chat message', `${data.username} : ${data.text}`);


       
        

          // const myChat = new Chat({
          //           message:data.message,
          //           owner: data.creator,
          //           events_id: data.events_id,
          //           score: data.score
          //         });
          //         //guarda en BBDD
          // theQuestions.save()
          // .then(question =>{
          // console.log("asdasdasdasdasdas",question.owner);
          // Questions.findById(question).populate("owner")
          // .then(questions_s => {
          // console.log("dentrooooooo",questions_s.owner.username);
          // res.status(200).json(questions_s);
          // });





    });

    

  
  });
};






   




