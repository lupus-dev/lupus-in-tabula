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

		let end = this._checkEnd();
		if (end) {
			let team_name = end === true ? 'nobody' : end.team_name;

			this.engine.game.state.status.code = 'ended';
			this.engine.game.state.status.winner = team_name;

			this.engine.updateQueue.enqueueStatusChange('ended');
			this.engine.updateQueue.enqueueGameEnded(team_name);

			debug('Game ended! Winner:', team_name);
		} else {
			this.engine.game.state.day++;
			this.engine.updateQueue.enqueueNextDay(this.engine.game.state.day);
			debug('Next day:', this.engine.game.state.day);
		}
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

	_checkEnd() {
		if (this._checkDeadEnd()) return true;

		let teams = _.uniq(_.map(this.engine.roles, x => x.constructor.team_id)).map(x => global.teams[x]);

		teams.sort((a, b) => b.priority - a.priority);

		for (let team of teams)
			if (team.checkWin(this.engine))
				return team;
		return false;
	}

	_checkDeadEnd() {
		let alive = this.engine.game.state.players.filter(p => p.alive);
		return alive.length == 0;
	}
};
