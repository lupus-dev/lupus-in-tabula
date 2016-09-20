@game
Feature:

	The engine manager works!

	@clean
	Scenario: After a request the engine cache works
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name     | "Wow!!"     |
		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/`game_id`/join
		Then response code should be 200
		And  I DELETE /api/game/`game_id`/leave
		And  response code should be 200
