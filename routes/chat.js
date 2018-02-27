const express = require('express');
const router  = express.Router();
const User               = require('../models/User');
const Item               = require('../models/Item');
const Chat               = require('../models/Chat');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
var server = require('http').createServer(router);
var io = require('socket.io')(server);

server.listen(8000);
//server.listen(80);
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('item/chat');   
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// http.listen(8000, function(){
//   console.log('listening on *:8000');
// });
   
 //


module.exports = router;