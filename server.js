
// load in npm modules
var express = require('express');

// create express var
var app = express();
// create server using express
var server = app.listen(3000);

// use static library in public folder
app.use(express.static('public'));

console.log("platform socket server is running");

// socket
var socket = require('socket.io');
var io = socket(server);
// on event 
io.sockets.on('connection', newConnection);


// socket runs on server
// function triggered on new socket connection
function newConnection(socket){
    //console.log(socket);
    console.log('new connection: '+ socket.id);

    //recieve player data
    socket.on('player', playerMsg);
    
    function playerMsg(data){
        //send message back out
        socket.broadcast.emit('player', data);
        //log player data
        //console.log(data);
    }
}