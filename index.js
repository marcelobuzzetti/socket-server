var express = require ('express');
const {json} = require("express");
var app = express();
var server = require('https').Server(app);
var io = require('socket.io')(server, {
    cors: "*"
});

app.use(express.static('client'));

app.get('/oi-mundo', function(req,res){
    res.status(200).send('Oi Mundo');
    io.of("/").emit('messages', req.query.id);
});
app.get('/:id', function(req,res){
    res.status(200).send(req.params.id);
    io.of("/").emit('messages', req.params.id);
});

/*var messages = [{
    id: 1,
    text: 'Bem-vindo ao chat privado de Socket.io e Node.js',
    nickname: 'Bot - Marcelo diz:'
}]*/

io.on('connection', function(socket){
    console.log('O cliente com ip: '+socket.handshake.address+' se conectou');
    /*socket.emit('messages', messages);
    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages',messages);
    });*/
});

server.listen(3000, function(){
    console.log('Servidor está funcionando em https://localhost:3000');
});
