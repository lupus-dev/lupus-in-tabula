@simulation
Feature:

	One simple game with 5 players: 1 lupus, 1 medium and 3 farmer

	@clean
	Scenario: Simulation 8
		Given There are the players
		| user1 | lupus |
		| user2 | medium |
		| user3 | farmer |
		| user4 | farmer |
		| user5 | farmer |

		Given There was a game in the database game_id
		| name 				| "The Game" |
		| owner_id 			| "`user1_id`" |
		| members 			| ["`user1_id`", "`user2_id`", "`user3_id`", "`user4_id`", "`user5_id`"] |
		| gen_info.min_players | 5 |
		| gen_info.max_players | 5 |
		| gen_info.random	| {"useCount":25,"seed":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]} |
		| state 			| {} |
		| state.day 		| 1 |
		| state.status 		| {"code":"running"} |
		| state.players 	| `players` |
		| state.votes 		| [] |

		# NIGHT 1: the lupus kill user5

		# lupus
		When Player user1 voted `user5_id` in game `game_id`
		# medium
		When Player user2 voted nobody in game `game_id`

		Then Wait 100 ms

		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| state.day 			| 2 |
		| state.players.`user5_id`.alive | false |

		# DAY 2: the villagers kill user4

		When Player user1 voted `user4_id` in game `game_id`
		When Player user2 voted `user4_id` in game `game_id`
		When Player user3 voted `user4_id` in game `game_id`
		When Player user4 voted `user1_id` in game `game_id`

		Then Wait 100 ms

		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| state.day 			| 3 |
		| state.players.`user4_id`.alive | false |

		# NIGHT 3: the lupus kill user3 and the medium acts

		# lupus
		When Player user1 voted `user3_id` in game `game_id`
		# guard
		When Player user2 voted `user5_id` in game `game_id`

		Then Wait 100 ms

		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| state.day 			| 3 |
		| state.players.`user3_id`.alive | false |
		| state.status.code		| "ended" |
		| state.status.winner	| "Lupuses" |

		And The Game with id `game_id` should be
		| state.players.1.data.seen.0.player | "`user5_id`" |
		| state.players.1.data.seen.0.mana | "white" |
		| state.players.1.data.seen.0.day | 3 |
