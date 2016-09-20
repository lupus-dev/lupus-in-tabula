@game
Feature:

	The user should be able to select a game and start streaming the game events

	@clean
	Scenario: Everything is correct
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name     | "FooBar"    |
		When I connect to game socket
		And  I send authorization token `logged_token`
		And  I should be authenticated
		When I send to the socket the game:select event
		| game_id | "`game_id`" |
		Then The socket response should be
		| status       | true        |
		| game.game_id | "`game_id`" |
		| game.name    | "FooBar"    |


	@clean
	Scenario: The game does not exist
		Given I am logged as
		| username | "edomora97" |
		When I connect to game socket
		And  I send authorization token `logged_token`
		And  I should be authenticated
		When I send to the socket the game:select event
		| game_id | "`FAKEID`" |
		Then The socket response should be
		| status  | false      |
