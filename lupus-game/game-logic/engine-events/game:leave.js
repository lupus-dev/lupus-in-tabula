var debug = require('debug')('lupus-game:engine_game_leave');

module.exports = function(data, callback) {
	if (!callback) callback = function(){};
	var game = this.game;

	var index = game.members.indexOf(data.user_id);
	if (index === -1)
		return callback({ error: 'You are not in the game', code: 400 });

	if (game.state.status.code !== 'open' &&
		game.state.status.code !== 'closed' &&
		game.state.status.code !== 'full')
		return callback({ error: 'You currently cannot leave this game', code: 400 });

	if (game.members.length == game.gen_info.max_players)
		// TODO notify the socket
		game.state.status.code = 'open';

	game.members.splice(index, 1);
	debug(`The user ${data.user_id} left the game ${game.game_id}`);

	game.save()
		.then(game => {
			// TODO notify the sockets
			callback(null, { data: game.toClientProtected(), code: 200 });
		})
		.catch(err => callback({ error: err, code: 500 }));
}
