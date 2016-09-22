var debug = require('debug')('lupus-game:engine_game_open');

var UPDATE_TYPES = require('../update-queue').UPDATE_TYPES;

module.exports = function(data, callback) {
	if (!callback) callback = function(){};
	var game = this.game;

	if (data.user_id != game.owner_id)
		return callback({ error: 'Only the owner can open the game', code: 401 });

	if (game.state.status.code !== 'draft' && game.state.status.code !== 'closed')
		return callback({ error: 'You cannot open this game', code: 400 });

	game.state.status.code = 'open';
	debug(`The game ${game.game_id} has been opened`);
	this.updateQueue.enqueueBroadcast(
		UPDATE_TYPES['GAME_STATUS_CHANGED'],
		{ status: { code: 'open' } }
	);

	game.save()
		.then(game => {
			callback(null, { data: game.toClientProtected(), code: 200 });
		})
		.catch(err => callback({ error: err, code: 500 }));
};
