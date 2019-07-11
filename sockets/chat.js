const IO = require('koa-socket-2');

const io = new IO({
  namespace: 'chat'
});

io.on('connection', function (socket) {
  console.log('usuario conectado');
});

io.on('chat message', function(ctx, data){
  console.log(data);
  ctx.socket.broadcast.emit('chat message', data);
});

io.on('disconnect', function () {
  console.log('usuario desconectado');
});

exports.socket = io;
