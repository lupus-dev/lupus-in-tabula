var debug = require('debug')('lupus-game:engine');
var EventEmitter = require('events');
var fs = require('fs');
var UpdateQueue = require('./update-queue');

var Game = global.Game;

module.exports = class Engine {
	constructor() { }

	init(game_id) {
		return new Promise((resolve, reject) => {
			Game.findOne({ _id: game_id })
				.then(game => {
					if (!game) return reject(new Error('Game not found'));

					this.game = game;
					this.events = new EventEmitter();
					this._bindEvents();
					this.updateQueue = new UpdateQueue(this);
					this.sockets = {};
					debug(`Engine for game ${game_id} ready`);
					resolve();
				});
		});
	}

	checkProgess() {
		return null;
	}

	registerSocket(socket) {
		this.sockets[socket.session.user_id] = socket;
		socket.join(this.game.game_id);
		socket.on('disconnect', () => debug('Socket ' + socket.id + ' disconnected'));
	}

	_bindEvents() {
		fs.readdirSync(__dirname + '/engine-events/').forEach((file) => {
			if (file.match(/\.js$/) !== null) {
				var name = file.replace('.js', '');
				console.log('Loaded event ' + name);
				this.events.on(name, require('./engine-events/' + name).bind(this));
			}
		});
	}
};
