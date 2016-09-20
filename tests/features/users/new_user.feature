@users
Feature:

	The lupus-users API should allow anonymous users to create a new user.

	@clean
	Scenario: Create a new user correctly
		Given I set JSON body to
		"""
		{
			"username": "edomora97",
			"password": "SecretPassword",
			"name": "Edoardo",
			"surname": "Morassutto"
		}
		"""
		When I POST to /api/users
		Then response code should be 201
		And  response body should be valid json
		And  I store the value of body path user_id as user_id in scenario scope
		And  The new user should be created
		And  The new user should be
		| username     | "edomora97"    |
		| name         | "Edoardo"      |
		| surname      | "Morassutto"   |
		| level        | 0              |
		| achievements | []             |
		| friends      | []             |
		And  The user's password should be SecretPassword


	@clean
	Scenario: Forget some required parameters
		Given I set JSON body to
		"""
		{
			"username": "edomora97",
			"password": "SecretPassword",
			"name": "Edoardo"
		}
		"""
		When I POST to /api/users
		Then response code should be 400
		And  response body should contain surname


	@clean
	Scenario: Using a unaviable username
		Given There was a registered user
		| username | "edomora97" |
		Given I set JSON body to
		"""
		{
			"username": "edomora97",
			"password": "SecretPassword",
			"name": "Edoardo",
			"surname": "Morassutto"
		}
		"""
		When I POST to /api/users
		Then I POST to /api/users
		Then response code should be 400
		And  response body should contain already taken
