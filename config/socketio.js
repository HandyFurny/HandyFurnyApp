var app = require('express')();
var http = require('http').Server(app);

module.exports = function (app) {

  

  app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/index.html');
    });
        
  
  http.listen(8000, function(){
    console.log('listening on *:8000');
  });
     
  
}
