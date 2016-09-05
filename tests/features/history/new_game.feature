@history
Feature:

	A logged user should be able to create a new game

	@clean
	Scenario: Create a new game correctly
		Given I am logged as
		| username | "edomora97" |
		When I set Authorization header to token `logged_token`
		And  I set JSON body to
		"""
		{
			"name": "Very good game",
			"gen_info": {
				"min_players": 7,
				"max_players": 15
			}
		}
		"""
		And  I POST to /history
		Then response code should be 201
		And  response body should be valid json
		And  I store the value of body path game_id as game_id in scenario scope
		And  response body path owner_id should be `logged_user_id`
		And  response body path name should be Very good game
		And  response body path members should be []
		And  response body path state.day should be undefined
		And  response body path state.status should be 0
		And  response body path state.players should be undefined
		And  response body path state.votes should be undefined
		And  response body path gen_info.min_players should be 7
		And  response body path gen_info.max_players should be 15
