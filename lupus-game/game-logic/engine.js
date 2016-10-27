var debug = require('debug')('lupus-game:engine');
var EventEmitter = require('events');
var Random = require('random-js');
var fs = require('fs');

var GameManager = require('./game-manager');
var UpdateQueue = require('./update-queue');
var RoleGenerator = require('./role-generator');
var RoleAssigner = require('./role-assigner');

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

					this.gameManager = new GameManager(this);
					if (this.game.state.status.code == 'running')
						this.gameManager.checkProgess();

					debug(`Engine for game ${game_id} ready`);
					resolve();
				})
				.catch(err => console.error(err));
		});
	}

	isDay() { return this.game.state.day % 2 == 0; }
	isNight() { return this.game.state.day % 2 == 1; }

	checkProgess() {
		this.gameManager.checkProgess();
	}

	startGame() {
		this.game.state.day = 1;
		this.game.state.players = [];

		let engine = this._newRandomEngine();

		let roleFrequencies = RoleGenerator.generate(this, engine);
		let roles = RoleAssigner.assign(this.game.members, roleFrequencies, engine);

		for (let member of this.game.members)
			this.game.state.players.push({
				user_id: member,
				role: roles[member],
				alive: true,
				data: {}
			});

		if (this.game.members[0]+'' != this.game.state.players[0].user_id+'' ||
			this.game.members[1]+'' != this.game.state.players[1].user_id+'')
			debug("--------------- ERROR #1", require('util').inspect(this.game, { depth: null }));

		this.game.state.votes = [];
		this._setupRoles();
		this.updateQueue.enqueueGameStarted();

		if (this.game.members[0]+'' != this.game.state.players[0].user_id+'' ||
			this.game.members[1]+'' != this.game.state.players[1].user_id+'')
			debug("--------------- ERROR #2", require('util').inspect(this.game, { depth: null }));

		// update the random state from the engine
		this.game.gen_info.random.useCount = engine.getUseCount();

		this.checkProgess();

		if (this.game.members[0]+'' != this.game.state.players[0].user_id+'' ||
			this.game.members[1]+'' != this.game.state.players[1].user_id+'')
			debug("--------------- ERROR #3", require('util').inspect(this.game, { depth: null }));

		return this.game.save()
			.then(game => {
				if (game.members[0]+'' != game.state.players[0].user_id+'' ||
					game.members[1]+'' != game.state.players[1].user_id+'')
					debug("--------------- ERROR #4", require('util').inspect(game, { depth: null }));
			});

		setTimeout(() => {
			Game.findOne({ _id: game_id })
				.then(game => {
					debug('#########' + require('util').inspect(game, { depth: null }));
					if (game.members[0]+'' != game.state.players[0].user_id+'' ||
						game.members[1]+'' != game.state.players[1].user_id+'')
						debug("--------------- ERROR #5", require('util').inspect(game, { depth: null }));
				});
		}, 1000);
	}

	registerSocket(socket) {
		this.sockets[socket.session.user_id] = socket;
		socket.join(this.game.game_id);

		if (this.roles[socket.session.user_id]) {
			let player = this.roles[socket.session.user_id];
			if (player.constructor.socket_room_suffix)
				socket.join(this.game.game_id + player.constructor.socket_room_suffix);
		}

		socket.on('disconnect', () => debug('Socket ' + socket.id + ' disconnected'));
	}

	_newRandomEngine() {
		let seed = Random.generateEntropyArray();
		let engine = Random.engines.mt19937().seedWithArray(seed);
		this.game.gen_info.random = {
			seed: seed,
			useCount: engine.getUseCount()
		};
		return engine;
	}

	_storeRandomEngine(engine) {
		this.game.gen_info.random.useCount = engine.getUseCount();
		return this.game.save();
	}

	_restoreRandomEngine() {
		if (!this.game.gen_info.random) return this._newRandomEngine();

		let seed = this.game.gen_info.random.seed;
		let engine = Random.engines.mt19937().seedWithArray(seed);
		engine.discard(this.game.gen_info.random.useCount);
		return engine;
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
			if (this.sockets[player.user_id]) {
				let socket = this.sockets[player.user_id];
				if (role_class.socket_room_suffix)
					socket.join(this.game.game_id + role_class.socket_room_suffix);
			}
		}
	}
};
