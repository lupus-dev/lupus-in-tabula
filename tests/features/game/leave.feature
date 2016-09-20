@game
Feature:

	The user should be able to leave the game if it hasn't started yet

	@clean
	Scenario: Everything is correct
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name     | "Wow!!"     |
		| members  | ["`logged_user_id`", "`FAKEID`"] |
		When I set Authorization header to token `logged_token`
		And  I DELETE /api/game/`game_id`/leave
		Then response code should be 200
		And  response body should be valid json
		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| members.length | 1 |

	@clean
	Scenario: The user is not logged in
		When I DELETE /api/game/`FAKEID`/leave
		Then response code should be 401
		And  response body should be valid json

	@clean
	Scenario: The user is not in the game
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name     | "Wow!!"     |
		When I set Authorization header to token `logged_token`
		And  I DELETE /api/game/`game_id`/leave
		Then response code should be 400
		And  response body should be valid json

	@clean
	Scenario: The game doesn't exist
		Given I am logged as
		| username | "edomora97" |
		When I set Authorization header to token `logged_token`
		And  I DELETE /api/game/`FAKEID`/leave
		Then response code should be 404
		And  response body should be valid json

	@clean
	Scenario: The game isn't in a correct state
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name              | "Wow!!"   |
		| state.status.code | "running" |
		| members  | ["`FAKEID`", "`logged_user_id`"] |
		When I set Authorization header to token `logged_token`
		And  I DELETE /api/game/`game_id`/leave
		Then response code should be 400
		And  response body should be valid json

	@clean
	Scenario: The game was full
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name                 | "Wow!!"  |
		| gen_info.max_players | 2        |
		| state.status.code    | "full"   |
		| members  | ["`FAKEID`", "`logged_user_id`"] |
		When I set Authorization header to token `logged_token`
		And  I DELETE /api/game/`game_id`/leave
		Then response code should be 200
		And  response body should be valid json
		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| state.status.code | "open" |
