var debug = require('debug')('lupus-game:engine_game_join');

var UPDATE_TYPES = require('../update-queue').UPDATE_TYPES;

module.exports = function(data, callback) {
	if (!callback) callback = function(){};
	var game = this.game;

	if (game.state.status.code !== 'open')
		return callback({ error: 'You currently cannot join this game', code: 400 });

	if (game.members.indexOf(data.user_id) !== -1)
		return callback({ error: 'You are already in the game', code: 400 });

	if (game.members.length + 1 > game.gen_info.max_players) {
		debug('Game ' + game.game_id + ' has invalid status: changed to full');

		game.state.status.code = 'full';
		game.save().then(() => {
			this.updateQueue.enqueueBroadcast(
				UPDATE_TYPES['GAME_STATUS_CHANGED'],
				{ status: { code: 'full' } }
			);

			callback({ error: 'Sorry, the game is full!', code: 400 });
		});
		return;
	}

	game.members.push(data.user_id);
	debug(`The user ${data.user_id} joined the game ${game.game_id}`);
	this.updateQueue.enqueueBroadcast(
		UPDATE_TYPES['JOIN_MEMBER'],
		{ user_id: data.user_id }
	);

	if (game.members.length >= game.gen_info.max_players) {
		debug('The game ' + game.game_id + ' became full');
		this.updateQueue.enqueueBroadcast(
			UPDATE_TYPES['GAME_STATUS_CHANGED'],
			{ status: { code: 'full' } }
		);
		game.state.status.code = 'full';
	}

	game.save()
		.then(game => {
			callback(null, { data: game.toClientProtected(), code: 200 });
		})
		.catch(err => callback({ error: err, code: 500 }));
};
