var debug = require('debug')('lupus-game:engine_update_queue');

module.exports = function(data, callback) {
	if (!callback) callback = function(){};

	var event_data = {
		data: data.data,
		type: data.type
	};

	if (data.level == 'broadcast') {
		var room_id = this.game.game_id + '';
		var room = global.socket.sockets.adapter.rooms[room_id];
		if (!room) { debug('Room ' + room_id + ' not found!'); return callback(); }

		let targetCount = 0;

		for (let socket_id in room.sockets) {
			let socket = global.socket.sockets.connected[socket_id];
			if (!socket) continue;
			let payload = event_data;
			payload.game = this.game.toClientProtected(socket.session.user_id);
			socket.emit('game:update', payload);
			targetCount++;
		}
		debug('Broadcast event sent to ' + targetCount + ' sockets');
	}

	callback(null, null);
};
