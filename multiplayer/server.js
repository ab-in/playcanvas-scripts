// This is the server script you need to run with NodeJS.

var io = require('socket.io')(2593);

var players = [];

io.on('connection', function (socket) {

  socket.on('initialize', function (data) {
  	io.emit('clientsCount', { 'count': io.engine.clientsCount });
  	socket.emit('playerList', { 'players': Object.keys(players) });
  	data.socketId = socket.id;
    socket.broadcast.emit('playerConnected', data);
  	players[socket.id] = data;
  });

  socket.on('update', function (data) {
  	data.socketId = socket.id;
    socket.broadcast.emit('playerUpdated', data);
  	players[socket.id] = data;
  });

  socket.on('disconnect', function () {
    io.emit('clientsCount', { 'count': io.engine.clientsCount });
    socket.broadcast.emit('playerDisconnected', { 'socketId': socket.id });
  	delete players[socket.id];
  });
});
