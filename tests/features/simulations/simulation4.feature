@simulation
Feature:

	One simple game with 6 players: 2 lupues, 3 farmers and a guard
	Players:
		- user1: lupus
		- user2: lupus
		- user3: guard
		- user4: farmer
		- user5: farmer
		- user6: farmer

	@clean
	Scenario: Simulation 1
		Given There was a registered user user1_id
		| username | "user1" |
		Given There was a registered user user2_id
		| username | "user2" |
		Given There was a registered user user3_id
		| username | "user3" |
		Given There was a registered user user4_id
		| username | "user4" |
		Given There was a registered user user5_id
		| username | "user5" |
		Given There was a registered user user6_id
		| username | "user6" |

		Given Store in players
		"""
			[
				{ "user_id": "`user1_id`", "role": "lupus", "alive": true },
				{ "user_id": "`user2_id`", "role": "lupus", "alive": true },
				{ "user_id": "`user3_id`", "role": "guard", "alive": true },
				{ "user_id": "`user4_id`", "role": "farmer", "alive": true },
				{ "user_id": "`user5_id`", "role": "farmer", "alive": true },
				{ "user_id": "`user6_id`", "role": "farmer", "alive": true }
			]
		"""

		Given There was a game in the database game_id
		| name 				| "The Game" |
		| owner_id 			| "`user1_id`" |
		| members 			| ["`user1_id`", "`user2_id`", "`user3_id`", "`user4_id`", "`user5_id`", "`user6_id`"] |
		| gen_info.min_players | 6 |
		| gen_info.max_players | 6 |
		| gen_info.random	| {"useCount":25,"seed":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]} |
		| state 			| {} |
		| state.day 		| 1 |
		| state.status 		| {"code":"running"} |
		| state.players 	| `players` |
		| state.votes 		| [] |

		# NIGHT 1: the lupuses kill user6 and the guard dies beacuse he protected a lupus

		# lupuses
		When Player user1 voted `user6_id` in game `game_id`
		When Player user2 voted `user6_id` in game `game_id`
		# guard
		When Player user3 voted `user1_id` in game `game_id`

		Then Wait 100 ms

		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| state.day 			| 1 |
		| state.players.`user6_id`.alive | false |
		| state.players.`user3_id`.alive | false |
		| state.status.code		| "ended" |
		| state.status.winner	| "Lupuses" |
