// $(function () {
//     var socket = io().connect('http://localhost:3000');
//     $('form').submit(function(){
//       console.log("entro a mandar la informacion")
//       socket.emit('chat message', $('#m').val());
//       $('#m').val('');
//       return false;
//     });
//     socket.on('chat message', function(msg){
//      $('#messages').append($('<li>').text(msg));
//      window.scrollTo(0, document.body.scrollHeight);
//    });

//   });

// /*************************************************************************** */

// /*
//   Message submission
// */
// $('form').submit(() => {
//     socket.emit('chat message', {
//       message: $('#msg').val()
//     });
//     $('#msg').val('');
  
//     return false;
//   });
  

//   /*
//     Socket events
//   */

//   socket.on('notify user', (user) => {
//     $('#messages').append($('<li class="event">').text(`You have joined as ${user}`));
//   });
//   socket.on('user connected', (user) => {
//     $('#messages').append($('<li class="event">').text(`${user} has joined.`));
//   });
//   socket.on('user disconnected', (user) => {
//     $('#messages').append($('<li class="event">').text(`${user} has left.`));
//   });
//   socket.on('user typing', (msg) => {
//     var i = _users.indexOf(msg.nickname);
  
//     if (msg.isTyping) {
//       if (i === -1) {
//         _users.push(msg.nickname);
//       }
//     } else {
//       if (i !== -1) {
//         _users.splice(i, 1);
//       }
//     }
  
//     switch(_users.length) {
//       case 0:
//         $('#typing-event').html('');
//         break;
//       case 1:
//         $('#typing-event').html(`${_users[0]} is typing...`);
//         break;
//       case 2:
//         $('#typing-event').html(`${_users[0]} and ${_users[1]} are typing...`);
//         break;
//       default:
//         $('#typing-event').html('Multiple users are typing...');
//         break;
//     }
//   });