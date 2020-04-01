var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/multiplayer.js', function(req, res) {
    res.sendFile(__dirname + '/multiplayer.js');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.username = (function () {
        var nouns = ['Delfín', 'Perro', 'Gato', 'Murciélago'];
        var adjectives = ['Rojo', 'Azul', 'Muerte', 'Enojado'];
        var noun = nouns[Math.floor(Math.random() * nouns.length)];
        var adjective = adjectives[
            Math.floor(Math.random() * adjectives.length)];
        return noun + adjective;
    })();
    socket.last_room = false;
    socket.broadcast.emit('hi');
    socket.on('disconnect', function() {
        console.log('a user disconnected');
    });
    socket.on('room', function(room_name) {
        socket.to(socket.last_room).emit('leaves', socket.username, room_name);
        if (socket.last_room) {
            socket.leave(socket.last_room);
        }
        socket.join(room_name);
        socket.to(room_name).emit('arrives', socket.username, socket.last_room);
        socket.last_room = room_name;
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
