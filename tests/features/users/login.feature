@users
Feature:

	The user should be able to login

	@clean
	Scenario: The user provides correct credentials
		Given There was a registered user reg_user_id
		| username | "edomora97"   |
		| password | "SuperSecret" |
		Given I set JSON body to
		"""
		{
			"username": "edomora97",
			"password": "SuperSecret"
		}
		"""
		When I POST to /users/session
		Then I print the response
		Then response code should be 201
		And  response body should be valid json
		And  response body path session.token should not be undefined

	@clear
	@current
	Scenario: The logged user has a valid session token
		Given I am logged as
		| username | "edomora97" |
		Then Redis should have a proper session token

	@clean
	Scenario: The user use a wrong password
		Given There was a registered user reg_user_id
		| username | "edomora97"   |
		| password | "SuperSecret" |
		Given I set JSON body to
		"""
		{
			"username": "edomora97",
			"password": "Wrong password"
		}
		"""
		When I POST to /users/session
		Then response code should be 401
		And  response body should be valid json
		And  response body should contain Wrong username or password

	@clean
	Scenario: The user tries with a wrong username
		Given I set JSON body to
		"""
		{
			"username": "edomora97",
			"password": "SuperSecret"
		}
		"""
		When I POST to /users/session
		Then response code should be 401
		And  response body should be valid json
		And  response body should contain Wrong username or password