var express = require('express');
var app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server,{
    cors: { // Permite el acceso de orígenes mixtos (CORS)
        origin: '*'
    }
});

app.use(express.static('client'));

app.get('/hello', function(req, res){
    res.status(200).send('Hello testing from route')
});


var messages= [{
    id: 1,
    text: 'Welcome to the private chat in Socket.io and NodeJs',
    nickname: 'Bot'
}];


// Detects if someone connected to socket and his IP
io.on('connection', function(socket){
    console.log("The client with IP: " +socket.handshake.address +" Is connected...");

    socket.emit('messages', messages);

    // Emit the message to everybody
    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages)
    })
});



server.listen(6677, function(){
    console.log('Server working at http://localhost:6677')
});
