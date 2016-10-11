var Team = require('../team');

class Lupuses extends Team {
	static checkWin(engine) {
		let lupusCount = 0;
		let nonLupusCount = 0;
		for (let user_id in engine.roles) {
			let player = engine.roles[user_id];
			if (player.constructor.team_id == 'lupuses' && player.player.alive)
				lupusCount++;
			else if (player.player.alive)
				nonLupusCount++;
		}
		return lupusCount >= nonLupusCount;
	}
};

Lupuses.team_id = 'lupuses';
Lupuses.team_name = 'Lupuses';
Lupuses.priority = 1;

module.exports = Lupuses;
