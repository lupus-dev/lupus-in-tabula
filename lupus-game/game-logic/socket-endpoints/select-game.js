var debug = require('debug')('lupus-game:select-game');

var Game = global.Game;

module.exports = function(socket, data, callback) {
	global.EngineManager.registerSocket(data.game_id, socket)
		.then(engine => {
			let user_id = socket.session.user_id;
			debug('User ' + user_id + ' has selected game ' + data.game_id);
			callback({ status: true, game: engine.game.toClientProtected(user_id, engine.roles[user_id]) });
		})
		.catch(err => {
			debug('User ' + socket.session.user_id + ' has selected invalid game ' + data.game_id);
			debug(err);
			callback({ status: false, error: 'Game not found' });
		});
};
