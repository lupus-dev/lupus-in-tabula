var Random = require('random-js');
var debug = require('debug')('lupus-game:role-generator');

var Lupus = require('./roles/lupus.role');

module.exports = class RoleGenerator {
	static generate(engine, random) {
		let num_players = engine.game.members.length;

		let role_ids = Object.keys(global.roles);
		let prob_sum = role_ids.reduce((prev, id) => prev + global.roles[id].generation.probability, 0);

		let roles = {};
		for (let role_id of role_ids) roles[role_id] = 0;

		let num_lupuses = RoleGenerator._lupusNumber(num_players);
		roles[Lupus.role_id] = num_lupuses;
		num_players -= num_lupuses;

		let randomizer = Random.real(0, prob_sum, false);

		while (num_players > 0) {
			let r = randomizer(random);

			let role_index = 0;
			let curr_sum = 0;
			while (curr_sum + global.roles[role_ids[role_index]].generation.probability <= r) {
				curr_sum += global.roles[role_ids[role_index]].generation.probability;
				role_index++;
			}

			let role = global.roles[role_ids[role_index]];
			// if we cannot generate the roles because there aren't enought players
			if (role.generation.probability > num_players)
				continue;

			num_players -= role.generation.group;
			roles[role.role_id] += role.generation.group;
		}

		debug('Generated roles', roles);
		return roles;
	}

	static _lupusNumber(num_players) {
		if (num_players <= 5) return 1;
		if (num_players <= 10) return 2;
		return (num_players / 3) | 0;
	}
};
