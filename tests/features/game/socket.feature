@game
Feature:

	The browser should be able to connect to socket.io and authenticate in it

	@clean
	Scenario: The user authenticates with a correct token
		Given I am logged as
		| username | "edomora97" |
		When I connect to game socket
		And  I send authorization token `logged_token`
		Then I should be authenticated

	@clean
	Scenario: The user authenticates with an invalid token
		When I connect to game socket
		And  I send authorization token `FAKEID`
		Then I should not be authenticated
