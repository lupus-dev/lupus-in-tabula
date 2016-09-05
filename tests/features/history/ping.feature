@history
Feature:

	The lupus-history API should respond to /history path

	Scenario:
		When I GET /history
		Then response code should be 200