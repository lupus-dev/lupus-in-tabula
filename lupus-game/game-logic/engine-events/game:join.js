var debug = require('debug')('lupus-game:engine_game_join');

module.exports = function(data, callback) {
	var game = this.game;

	if (game.state.status.code !== 'open')
		return callback({ error: 'You currently cannot join this game', code: 400 });

	if (game.members.indexOf(data.user_id) !== -1)
		return callback({ error: 'You are already in the game', code: 400 });

	if (game.members.length + 1 > game.gen_info.max_players)
		// TODO change the state and notify the socket
		return callback({ error: 'Sorry, the game is full!', code: 400 });

	game.members.push(data.user_id);
	debug(`The user ${data.user_id} joined the game ${game.game_id}`);

	if (game.members.length >= game.gen_info.max_players)
		// TODO notify the socket
		game.state.status.code = 'full';

	game.save()
		.then(game => {
			// TODO notify the sockets
			callback(null, { data: game.toClientProtected(), code: 200 });
		})
		.catch(err => callback({ error: err, code: 500 }));
};
