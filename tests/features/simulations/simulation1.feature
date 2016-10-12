@simulation
Feature:

	One simple game with 6 players: 2 lupues and 4 farmers

	@clean
	Scenario: Simulation 1
		Given There are the players
		| user1 | lupus |
		| user2 | lupus |
		| user3 | farmer |
		| user4 | farmer |
		| user5 | farmer |
		| user6 | farmer |

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

		# NIGHT 1: the lupuses kills user3

		When Player user1 voted `user3_id` in game `game_id`
		When Player user2 voted `user3_id` in game `game_id`

		Then Wait 100 ms

		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| state.day 			| 2 |
		| state.players.`user3_id`.alive | false |


		# DAY 2: the villagers kills user2

		When Player user1 voted `user4_id` in game `game_id`
		When Player user2 voted `user4_id` in game `game_id`
		When Player user4 voted `user2_id` in game `game_id`
		When Player user5 voted `user2_id` in game `game_id`
		When Player user6 voted `user2_id` in game `game_id`

		Then Wait 100 ms

		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| state.day 			| 3 |
		| state.players.`user2_id`.alive | false |


		# NIGHT 3: the lupus kills user4

		When Player user1 voted `user4_id` in game `game_id`

		Then Wait 100 ms

		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| state.day 			| 4 |
		| state.players.`user4_id`.alive | false |


		# DAY 4: the villagers kill the last lupus and win

		When Player user1 voted `user5_id` in game `game_id`
		When Player user5 voted `user1_id` in game `game_id`
		When Player user6 voted `user1_id` in game `game_id`

		Then Wait 100 ms

		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| state.day 			| 4 |
		| state.status.code		| "ended" |
		| state.status.winner	| "Villagers" |
		| state.players.`user1_id`.alive | false |
