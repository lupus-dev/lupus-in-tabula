var selectGame = require('./socket-endpoints/select-game');

module.exports = function(socket, auth) {
	socket.on('game:select', (data, callback) => selectGame(socket, data, callback));
};