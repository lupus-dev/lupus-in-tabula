module.exports = function(game, user_id, role) {
	var game_status = game.state.status.code;

	if (game_status == 'ended' || game_status == 'stopped')
		return game.toClient();

	var ret = {
		game_id: game._id,
		owner_id: game.owner_id,
		name: game.name,
		members: game.members,
		state: {
			status: game.state.status
		},
		gen_info: game.gen_info
	};

	if (game_status == 'running') {
		ret.state.day = game.state.day;

		ret.state.players = {};
		for (let player of game.state.players)
			if (player.user_id == user_id) {
				ret.state.players[player.user_id] = {
					user_id: player.user_id,
					alive: player.alive,
					role: player.role,
					data: player.data
				};
				if (role)
					ret.state.players[player.user_id].extra = {
						splash: role.splash(),
						needVote: role.needVote(),
						role_id: role.constructor.role_id,
						role_name: role.constructor.role_name,
						team_id: role.constructor.team_id,
						mana: role.constructor.mana
					};
			} else
				ret.state.players[player.user_id] = {
					user_id: player.user_id,
					alive: player.alive
				};

		ret.state.votes = game.state.votes.filter((vote) => {
			return vote.user_id == user_id;
		});
	}

	return ret;
};
