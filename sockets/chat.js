const IO = require('koa-socket-2');

const io = new IO({
  namespace: 'chat'
});

io.use(async ( ctx, next ) => {
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++');
  console.log(ctx.event);
  if(false){
    await next()
  }
})

io.on('connection', function (ctx) {
  ctx.socket.emit('wellcome message', 'Bienvenido ' + ctx.data.handshake.query.user_id);
  console.log('usuario ' + ctx.data.handshake.query.user_id + ' conectado');
});

io.on('chat message', function(ctx, data){
  console.log(data);
  var msg = ctx.socket.handshake.query.user_id + ' dice: ' + data;
  ctx.socket.broadcast.emit('chat message', msg);
});

io.on('disconnect', function () {
  console.log('usuario desconectado');
});

exports.socket = io;
