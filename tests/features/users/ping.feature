@users
Feature:

	The lupus-users API should respond to /users path

	@clean
	Scenario:
		When I GET /users
		Then response code should be 200