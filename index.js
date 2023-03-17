var express = require ('express');
const {json} = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, {
    cors: "*"
});

app.get('/oi-mundo', function(req,res){
    res.status(200).send('Oi Mundo');
    io.of("/").emit('messages', req.query.id);
});
app.get('/:id', function(req,res){
    res.status(200).send(req.params.id);
    io.of("/").emit('messages', req.params.id);
});

io.on('connection', function(socket){
    console.log('O cliente com ip: '+socket.handshake.address+' se conectou');
});

server.listen(3000, function(){
    console.log('Servidor está funcionando em https://localhost:3000');
});
