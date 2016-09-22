var debug = require('debug')('lupus-game:update-queue');

class UpdateQueue {

	constructor(engine) {
		this.engine = engine;
		this.queue = [];
	}

	enqueueBroadcast(type, data) {
		this._enqueue('broadcast', null, type, data);
	}

	enqueueRoom(targets, type, data) {
		if (typeof targets != 'array') targets = [targets];
		this._enqueue('room', targets, type, data);
	}

	enqueueUser(targets, type, data) {
		if (typeof targets != 'array') targets = [targets];
		this._enqueue('user', targets, type, data);
	}

	enqueueStatusChange(status) {
		this.enqueueBroadcast(UpdateQueue.UPDATE_TYPES['GAME_STATUS_CHANGED'], { status: status });
	}

	enqueueJoinMember(user_id) {
		this.enqueueBroadcast(UpdateQueue.UPDATE_TYPES['JOIN_MEMBER'], { user_id: user_id });
	}

	enqueueLeaveMember(user_id) {
		this.enqueueBroadcast(UpdateQueue.UPDATE_TYPES['LEAVE_MEMBER'], { user_id: user_id });
	}

	_enqueue(level, targets, type, data) {
		debug(`New update in queue ${level} ${targets} ${type} ${JSON.stringify(data)}`);
		var update = {
			level: level,
			targets: targets,
			type: type,
			data: data
		};
		this.queue.push(update);
		this.engine.events.emit('engine:update_queue', update);
	}
};

UpdateQueue.UPDATE_TYPES = {
	'GAME_STATUS_CHANGED': 'GAME_STATUS_CHANGED',
	'JOIN_MEMBER':         'JOIN_MEMBER',
	'LEAVE_MEMBER':        'LEAVE_MEMBER',
	'NEXT_DAY':            'NEXT_DAY',
	'DEATH_BY_OTHER':      'DEATH_BY_OTHER',
	'PUBLIC_VOTE':         'PUBLIC_VOTE'
};

module.exports = UpdateQueue;
