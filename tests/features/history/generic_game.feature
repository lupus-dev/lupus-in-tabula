@history
Feature:

	The user can ask for a list of games and fetch the data

	@clean
	Scenario: Fetch the information about a single game
		Given There was a game in the database game_id
		| name           | "Yo! Yo!"     |
		When I GET /api/history/games/`game_id`
		Then response code should be 200
		And  response body should be valid json
		And  The game at index `game_id` should be
		| name           | "Yo! Yo!"     |

	@clean
	Scenario: Fetch the information about 2 games
		Given There was a game in the database game_id_1
		| name           | "Yo! Yo!"     |
		Given There was a game in the database game_id_2
		| name           | "Bro! Bro!"   |
		When I GET /api/history/games/`game_id_1`,`game_id_2`
		Then response code should be 200
		And  response body should be valid json
		And  The game at index `game_id_1` should be
		| name           | "Yo! Yo!"     |
		And  The game at index `game_id_2` should be
		| name           | "Bro! Bro!"   |

	@clean
	Scenario: Return 200 if part of the games were found
		Given There was a game in the database game_id
		| name           | "Yo! Yo!"     |
		When I GET /api/history/games/`game_id`,`FAKEID`
		Then response code should be 200
		And  response body should be valid json
		And  The game at index `game_id` should be
		| name           | "Yo! Yo!"     |

	@clean
	Scenario: Return 404 if no games were found
		When I GET /api/history/games/`FAKEID`
		Then response code should be 404
		And  response body should be valid json
