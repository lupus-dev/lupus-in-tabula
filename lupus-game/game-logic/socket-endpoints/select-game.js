var debug = require('debug')('lupus-game:select-game');

var Game = global.Game;

module.exports = function(socket, data, callback) {
	Game.findOne({ _id: data.game_id })
		.then(game => {
			if (!game) {
				debug('User ' + socket.session.user_id + ' has selected invalid game ' + data.game_id);
				return callback({ status: false, error: 'Game not found' });
			}

			debug('User ' + socket.session.user_id + ' has selected game ' + data.game_id);
			callback({ status: true, game: game.toClientProtected() });
		})
		.catch(err => console.error('Error fetching the game ' + data.game_id));
};
