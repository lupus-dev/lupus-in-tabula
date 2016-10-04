var Random = require('random-js');

module.exports = class RoleAssigner {
	/**
	 * @param user_ids ['user_id_1', 'user_id_2']
	 * @param roles {'lupus': 4, 'farmer': 2}
	 * @return {'user_id_1': 'lupus', 'user_id_2': 'farmer'}
	 */
	static assign(user_ids, roles, random) {
		let unpacked_roles = [];
		for (let role in roles)
			for (let i = 0; i < roles[role]; i++)
				unpacked_roles.push(role);

		Random.shuffle(random, unpacked_roles);

		let res = {};
		let count = 0;
		for (let user_id of user_ids)
			res[user_id] = unpacked_roles[count++];

		return res;
	}
};
