@users
Feature:

	A logged user should be able to fetch his user informations

	@clean
	Scenario: The user provides a correct token
		Given I am logged as
		| username | "edomora97" |
		When I set Authorization header to token `logged_token`
		And  I GET /api/users/me
		Then response code should be 200
		And  response body path username should be edomora97

	@clean
	Scenario: The user provides an invalid token
		When I set Authorization header to token `FAKEID`
		And  I GET /api/users/me
		Then response code should be 401