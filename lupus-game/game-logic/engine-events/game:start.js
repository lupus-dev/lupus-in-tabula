var debug = require('debug')('lupus-game:engine_game_start');
var change_game_status = require('./shared/change_game_status');

module.exports = function(data, callback) {
	change_game_status.bind(this)(debug, data, 'running', (err, data) => {
		if (!err) {
			this.startGame()
				.then(game => callback(null, { data: game, code: 200 }))
				.catch(err => callback({ error: err, code: 500 }));
		} else
			callback(err);
	});
};
