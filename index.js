var express = require ('express');
require('dotenv').config();
var app = express();
var server = require('https').Server(app);
var io = require('socket.io')(server, {
    cors: "*"
});
const PORT = process.env.PORT

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

server.listen(PORT, function(){
    console.log(`Servidor está funcionando em https://localhost:${PORT}`);
});
