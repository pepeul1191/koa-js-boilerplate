const IO = require('koa-socket-2');

const socket = new IO({
  namespace: 'chat'
});

var nicknames = {};

socket.on('connection', function (ctx, msg) {
  console.log('a user connected -> ' + ctx.id);
});

socket.on('nickname', function (nick, fn) {
  if (nicknames[nick]) {
    fn(true);
  } else {
    fn(false);
    nicknames[nick] = socket.nickname = nick;
    socket.broadcast.emit('announcement', nick + ' connected');
    io.sockets.emit('nicknames', nicknames);
  }
});

socket.on('disconnect', function () {
  if (!socket.nickname) return;
  console.log('usuario desconectado');
  delete nicknames[socket.nickname];
  socket.broadcast.emit('announcement', socket.nickname + ' disconnected');
  socket.broadcast.emit('nicknames', nicknames);
});

socket.on('user message', function (ctx, msg) {
  console.log(msg);
  socket.broadcast('user message', socket.nickname, msg);
});

exports.socket = socket;
