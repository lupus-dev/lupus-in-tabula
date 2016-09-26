var debug = require('debug')('lupus-game:engine_game_leave');

var UPDATE_TYPES = require('../update-queue').UPDATE_TYPES;

module.exports = function(data, callback) {
	if (!callback) callback = function(){};
	var game = this.game;

	var index = game.members.indexOf(data.user_id);
	if (index === -1)
		return callback({ error: 'You are not in the game', code: 400 });

	if (game.owner_id == data.user_id)
		return callback({ error: 'The owner cannot leave the game', code: 400 });

	if (game.state.status.code !== 'open' &&
		game.state.status.code !== 'closed' &&
		game.state.status.code !== 'full')
		return callback({ error: 'You currently cannot leave this game', code: 400 });

	if (game.members.length == game.gen_info.max_players) {
		debug(`Game ${game.game_id} auto-changed state to open`);
		game.state.status.code = 'open';
		game.save().then(() => {
			this.updateQueue.enqueueStatusChange({ code: 'open' });
		});
	}

	game.members.splice(index, 1);
	debug(`The user ${data.user_id} left the game ${game.game_id}`);
	this.updateQueue.enqueueLeaveMember(data.user_id);

	game.save()
		.then(game => {
			callback(null, { data: game.toClientProtected(), code: 200 });
		})
		.catch(err => callback({ error: err, code: 500 }));
}
