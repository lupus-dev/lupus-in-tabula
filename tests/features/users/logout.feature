@users
Feature:

	The user should be able to logout

	@clean
	Scenario: The user provides a correct token
		Given I am logged as
		| username | "edomora97" |
		When I set Authorization header to token `logged_token`
		And  I DELETE /api/users/session
		Then response code should be 200
		And  Redis should not have the session

	@clean
	Scenario: The user provides a incorrect token
		When I set Authorization header to token `FAKEID`
		And  I DELETE /api/users/session
		Then response code should be 401
