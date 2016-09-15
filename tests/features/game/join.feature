@game
Feature:

	The user should be able to join a game if hasn't done it yet

	@clean
	Scenario: Everything is correct
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name     | "Wow!!"     |
		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/`game_id`/join
		Then response code should be 200
		And  response body should be valid json
		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| members.1 | "`logged_user_id`" |

	@clean
	Scenario: The user is not logged in
		When I POST to /api/game/123aaaaabbbbbccccc/join
		Then response code should be 401
		And  response body should be valid json

	@clean
	Scenario: The user is already in the game
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name     | "Wow!!"     |
		| owner_id | "`logged_user_id`"   |
		| members  | ["`logged_user_id`"] |
		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/`game_id`/join
		Then response code should be 400
		And  response body should be valid json
		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| members.length | 1     |

	@clean
	Scenario: The game doesn't exist
		Given I am logged as
		| username | "edomora97" |
		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/123aaabbbccc/join
		Then response code should be 404
		And  response body should be valid json

	@clean
	Scenario: The game isn't in open state
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name              | "Wow!!"  |
		| state.status.code | "closed" |
		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/`game_id`/join
		Then response code should be 400
		And  response body should be valid json

	@clean
	Scenario: The game is full
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name              | "Wow!!"  |
		| gen_info.max_players | 1     |
		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/`game_id`/join
		Then response code should be 400
		And  response body should be valid json

	@clean
	Scenario: The game became full
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name              | "Wow!!"  |
		| gen_info.max_players | 2     |
		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/`game_id`/join
		Then response code should be 200
		And  response body should be valid json
		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| state.status.code | "full" |