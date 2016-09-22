@game
Feature:

	The game can be closed by the owner

	@clean
	Scenario: The owner closes a valid game
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name     | "Wow!!"     |
		| owner_id | "`logged_user_id`" |
		| members  | ["`logged_user_id`"] |
		| state.status.code | "open" |
		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/`game_id`/close
		Then response code should be 200
		And  response body should be valid json
		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| state.status.code | "closed" |

	@clean
	Scenario: The user tries to close a missing game
		Given I am logged as
		| username | "edomora97" |
		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/`FAKEID`/close
		Then response code should be 404
		And  response body should be valid json

	@clean
	Scenario: The user tries to close an invalid game
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name     | "Wow!!"     |
		| owner_id | "`logged_user_id`" |
		| members  | ["`logged_user_id`"] |
		| state.status.code | "running" |
		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/`game_id`/close
		Then response code should be 400
		And  response body should be valid json

	@clean
	Scenario: The user is not logged in
		Given There was a game in the database game_id
		| name     | "Wow!!"     |
		| owner_id | "`logged_user_id`" |
		| members  | ["`logged_user_id`"] |
		And  I POST to /api/game/`game_id`/close
		Then response code should be 401
		And  response body should be valid json

	@clean
	Scenario: The user tries to close a game that he doesn't own
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name     | "Wow!!"     |
		| owner_id | "`FAKEID`" |
		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/`game_id`/close
		Then response code should be 401
		And  response body should be valid json
