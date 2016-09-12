@game
Feature:

	The lupus-game API should respond to /api/game path

	Scenario:
		When I GET /api/game
		Then response code should be 200