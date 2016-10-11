var debug = require('debug')('lupus-game:engine_update_queue');

module.exports = function(data, callback) {
	if (!callback) callback = function(){};

	var event_data = {
		data: data.data,
		type: data.type
	};

	let targets = [];

	if (data.level == 'broadcast' || data.level == 'room') {
		let rooms = [];

		if (data.level == 'broadcast') rooms = [this.game.game_id + ''];
		else rooms = data.targets;

		for (let room_id of rooms) {
			var room = global.socket.sockets.adapter.rooms[room_id];
			if (!room) { debug('Room ' + room_id + ' not found!'); continue; }

			for (let socket_id in room.sockets) {
				let socket = global.socket.sockets.connected[socket_id];
				if (!socket) continue;

				targets.push({
					socket: socket,
					user_id: socket.session.user_id
				});
			}
		}
	} else if (data.level == 'user') {
		for (let user_id of data.targets) {
			let socket = this.sockets[user_id];
			if (!socket) continue;

			targets.push({
				socket: socket,
				user_id: user_id
			});
		}
	}

	for (let target of targets) {
		let payload = event_data;
		payload.game = this.game.toClientProtected(target.user_id, this.roles[target.user_id]);
		target.socket.emit('game:update', payload);
	}

	debug('Event emitted to ' + targets.length + ' sockets');

	callback();
};
