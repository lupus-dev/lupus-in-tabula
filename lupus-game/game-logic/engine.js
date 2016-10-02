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

					this._setupRoles();

					debug(`Engine for game ${game_id} ready`);
					resolve();
				})
				.catch(err => console.error(err));
		});
	}

	isDay() { return this.game.state.day % 2 == 0; }
	isNight() { return this.game.state.day % 2 == 1; }

	checkProgess() {
		return null;
	}

	startGame() {
		this.game.state.day = 1;
		this.game.state.players = [];
		for (let member of this.game.members)
			this.game.state.players.push({
				user_id: member,
				role: Math.random() < 0.5 ? 'lupus' : 'farmer', // TODO generate the roles
				alive: true,
				data: {}
			});
		this.game.state.votes = [];
		this._setupRoles();
		this.updateQueue.enqueueGameStarted();
		return this.game.save();
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
				this.events.on(name, require('./engine-events/' + name).bind(this));
			}
		});
	}

	_setupRoles() {
		this.roles = {};

		if (this.game.state.status.code != 'running') return;

		for (let player of this.game.state.players) {
			var role_class = global.roles[player.role];
			if (!role_class) {
				debug('ERROR: The player ' + player.user_id + ' has an invalid role: ' + player.role);
				return;
			}

			this.roles[player.user_id] = new role_class(this, player.user_id);
		}
	}
};
