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