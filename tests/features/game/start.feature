@game
Feature:

	The user should be able to start a game if enought players are connected

	@clean
	Scenario: Everything is correct
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name                 | "Wow!!"                          |
		| owner_id             | "`logged_user_id`"               |
		| members              | ["`logged_user_id`", "`FAKEID`"] |
		| state.status.code    | "open"                           |
		| gen_info.min_players | 2                                |
		| gen_info.max_players | 3                                |
		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/`game_id`/start
		Then response code should be 200
		And  response body should be valid json
		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| state.status.code                    | "running" |
		| state.players.`logged_user_id`.alive | true      |
		| state.players.`FAKEID`.alive         | true      |
		| state.day                            | 1         |

	@clean
	Scenario: The user tries to start a missing game
		Given I am logged as
		| username | "edomora97" |
		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/`FAKEID`/start
		Then response code should be 404
		And  response body should be valid json

	@clean
	Scenario: The user tries to start an invalid game
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name                 | "Wow!!"                          |
		| owner_id             | "`logged_user_id`"               |
		| members              | ["`logged_user_id`", "`FAKEID`"] |
		| state.status.code    | "draft"                          |
		| gen_info.min_players | 2                                |
		| gen_info.max_players | 3                                |
		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/`game_id`/start
		Then response code should be 400
		And  response body should be valid json

		@clean
		Scenario: The user tries to start a game with too few members
			Given I am logged as
			| username | "edomora97" |
			Given There was a game in the database game_id
			| name                 | "Wow!!"                          |
			| owner_id             | "`logged_user_id`"               |
			| members              | ["`logged_user_id`", "`FAKEID`"] |
			| state.status.code    | "draft"                          |
			| gen_info.min_players | 5                                |
			| gen_info.max_players | 10                               |
			When I set Authorization header to token `logged_token`
			And  I POST to /api/game/`game_id`/start
			Then response code should be 400
			And  response body should be valid json

		@clean
		Scenario: The user is not logged in
			Given There was a game in the database game_id
			| name     | "Wow!!"     |
			| owner_id | "`FAKEID`" |
			| members  | ["`FAKEID`"] |
			And  I POST to /api/game/`game_id`/start
			Then response code should be 401
			And  response body should be valid json

		@clean
		Scenario: The user tries to start a game that he doesn't own
			Given I am logged as
			| username | "edomora97" |
			Given There was a game in the database game_id
			| name     | "Wow!!"     |
			| owner_id | "`FAKEID`" |
			When I set Authorization header to token `logged_token`
			And  I POST to /api/game/`game_id`/start
			Then response code should be 401
			And  response body should be valid json
