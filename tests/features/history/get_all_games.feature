@history
Feature:

	The user should be able to fetch the informations about all the games in the database

	@clean
	Scenario: There is only one game
		Given There was a game in the database
		| name           | "Yo! Yo!"     |
		When I GET /api/history/games
		Then response code should be 200
		And  response body should be valid json
		And  The game at index 0 should be
		| name           | "Yo! Yo!"     |


	@clean
	Scenario: There are two games so they are sorted by created_at DESC
		Given There was a game in the database
		| name           | "Yo! Yo! Old"     |
		Given There was a game in the database
		| name           | "Yo! Yo! New"     |
		When I GET /api/history/games
		Then response code should be 200
		And  response body should be valid json
		And  The game at index 0 should be
		| name           | "Yo! Yo! New"     |
		And  The game at index 1 should be
		| name           | "Yo! Yo! Old"     |
