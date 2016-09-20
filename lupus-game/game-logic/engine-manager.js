var debug = require('debug')('lupus-game:engine-manager');
var Engine = require('./engine');

module.exports = class EngineManager {

	constructor() {
		this.engines = {};
		this.sockets = {};
	}

	getEngine(game_id) {
		return new Promise((resolve, reject) => {
			// if the engine is cached
			if (this.engines[game_id])
				return resolve(this.engines[game_id]);

			var engine = new Engine();
			engine.init(game_id)
				.then(() => {
					debug(`Engine for game ${game_id} created`);
					this.engines[game_id] = engine;
					resolve(engine);
				})
				.catch(err => reject(err));
		});
	}

	registerSocket(game_id, socket) {
		return new Promise((resolve, reject) => {
			this.getEngine(game_id)
				.then(engine => {
					this.sockets[game_id] = this.sockets[game_id] || 0;
					this.sockets[game_id]++;
					socket.on('disconnect', () => this.sockets[game_id]--);
					resolve(engine);
				})
				.catch(err => reject(err));
		});
	}
};
