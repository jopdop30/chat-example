var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/login', function(req, res) {
    res.sendfile(__dirname + '/login.html');
});

app.get('/cmd', function(req, res) {
    res.sendfile(__dirname + '/cmd.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('command', function(cmd){
    io.emit('command', cmd);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
