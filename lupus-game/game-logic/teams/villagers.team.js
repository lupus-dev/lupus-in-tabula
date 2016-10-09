var Team = require('../team');

class Villagers extends Team {
	static checkWin(engine) {
		for (let user_id in engine.roles) {
			let player = engine.roles[user_id];
			if (player.constructor.team_id != 'villagers' && player.player.alive)
				return false;
		}
		return true;
	}
};

Villagers.team_id = 'villagers';
Villagers.team_name = 'Villagers';
Villagers.priority = 1;

module.exports = Villagers;
