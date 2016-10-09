var Random = require('random-js');
var debug = require('debug')('lupus-game:game-manager');
var _ = require('underscore');

module.exports = class GameManager {
	constructor(engine) {
		this.engine = engine;
		engine.events.on('engine:voted', (vote) => this.checkProgess());
	}

	checkProgess() {
		if (this._needVote()) return false;

		this._doActions();

		this.engine.game.state.day++;
		this.engine.updateQueue.enqueueNextDay(this.engine.game.state.day);
		return this.engine.game.save();
	}

	_needVote() {
		for (let user_id in this.engine.roles)
			if (this.engine.roles[user_id].needVote())
				return true;

		debug('All players have voted');
		return false;
	}

	_doActions() {
		let players = _.values(this.engine.roles);

		let random = this.engine._restoreRandomEngine();
		Random.shuffle(random, players);

		let cmp = this.engine.isDay() ?
					(a,b) => b.constructor.priority_day - a.constructor.priority_day :
					(a,b) => b.constructor.priority_night - a.constructor.priority_night

		players.sort(cmp);

		for (let player of players)
			player.performAction();

		this.engine._storeRandomEngine(random);
	}
};
