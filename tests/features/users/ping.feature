@users
Feature:

	The lupus-users API should respond to /users path

	Scenario:
		When I GET /api/users
		Then response code should be 200
