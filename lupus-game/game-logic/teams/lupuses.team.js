var Team = require('../team');

class Lupuses extends Team {
	static checkWin(engine) {
		let lupusCount = 0;
		let nonLupusCount = 0;
		for (let player in engine.roles)
			if (player.constructor.team_id == 'lupuses' && player.player.alive)
				lupusCount++;
			else
				nonLupusCount++;
		return lupusCount >= nonLupusCount;
	}
};

Lupuses.team_id = 'lupuses';
Lupuses.team_name = 'Lupuses';
Lupuses.priority = 1;

module.exports = Lupuses;
