var debug = require('debug')('lupus-game:engine_update_queue');

module.exports = function(data, callback) {
	if (!callback) callback = function(){};

	var event_data = {
		game: this.game,
		data: data.data,
		type: data.type
	};

	var scopes = [];

	if (data.level == 'broadcast')
		scopes = [ global.socket.to(this.game.game_id) ];
	else if (data.level == 'room')
		for (let target of data.targets)
			scopes.push(global.socket.to(target));
	else if (data.level == 'user')
		for (let target of data.targets)
			scopes.push(this.sockets[target]);

	for (let scope of scopes)
		scope.emit('game:update', event_data);

	debug('Update emitted to ' + scopes.length + ' destination/s');

	callback(null, null);
};
