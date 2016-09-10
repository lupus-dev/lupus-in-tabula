@game
Feature:

	The lupus-game API should respond to /game path

	Scenario:
		When I GET /game
		Then response code should be 200