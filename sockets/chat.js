const IO = require('koa-socket-2');

const socket = new IO({
  namespace: 'chat'
});

socket.on('message', ctx => {
  console.log(ctx.data);
  chat.broadcast('response');
});

socket.on('connection', ctx => {
  console.log('nueva conexion');
  chat.broadcast('response');
});

exports.socket = socket;