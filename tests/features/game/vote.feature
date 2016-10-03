@game
Feature:

	The user should be able to vote

	@clean
	Scenario: Everything is correct
		Given I am logged as
		| username | "edomora97" |
		Given There was a registered user other_user
		| username | "pippo"     |
		Given There was a game in the database game_id
		| name                 | "Wow!!"                              |
		| owner_id             | "`logged_user_id`"                   |
		| members              | ["`logged_user_id`", "`other_user`"] |
		| state.status.code    | "running"                            |
		| state.day            | 5                                    |
		| state.players        | [{"role":"lupus","alive":true,"user_id":"`logged_user_id`"},{"role":"lupus","alive":true,"user_id":"`other_user`"}] |
		When I set Authorization header to token `logged_token`
		And  I set JSON body to
		"""
			{
				"vote": "`other_user`"
			}
		"""
		And  I POST to /api/game/`game_id`/vote
		Then response code should be 200
		And  response body should be valid json
		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| state.votes.0.user_id | "`logged_user_id`" |
		| state.votes.0.vote    | "`other_user`"     |
		| state.votes.0.day     | 5                  |


	@clean
	Scenario: The vote is not valid
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name                 | "Wow!!"                              |
		| owner_id             | "`logged_user_id`"                   |
		| members              | ["`logged_user_id`", "`other_user`"] |
		| state.status.code    | "running"                            |
		| state.day            | 5                                    |
		| state.players        | [{"role":"lupus","alive":true,"user_id":"`logged_user_id`"},{"role":"lupus","alive":true,"user_id":"`other_user`"}] |
		When I set Authorization header to token `logged_token`
		And  I set JSON body to
		"""
			{
				"vote": "`FAKEID`"
			}
		"""
		And  I POST to /api/game/`game_id`/vote
		Then response code should be 400
		And  response body should be valid json
		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| state.votes.length | 0 |


	@clean
	Scenario: The user voted himself
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name                 | "Wow!!"                              |
		| owner_id             | "`logged_user_id`"                   |
		| members              | ["`logged_user_id`", "`other_user`"] |
		| state.status.code    | "running"                            |
		| state.day            | 5                                    |
		| state.players        | [{"role":"lupus","alive":true,"user_id":"`logged_user_id`"},{"role":"lupus","alive":true,"user_id":"`other_user`"}] |
		When I set Authorization header to token `logged_token`
		And  I set JSON body to
		"""
			{
				"vote": "`logged_user_id`"
			}
		"""
		And  I POST to /api/game/`game_id`/vote
		Then response code should be 400
		And  response body should be valid json
		And  I GET /api/history/games/`game_id`
		And  The game at index `game_id` should be
		| state.votes.length | 0 |

	@clean
	Scenario: The user is not in the game
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name                 | "Wow!!"                              |
		| owner_id             | "`logged_user_id`"                   |
		| members              | ["`FAKEID`"] |
		| state.status.code    | "running"                            |
		| state.day            | 5                                    |
		| state.players        | [{"role":"lupus","alive":true,"user_id":"`FAKEID`"}] |
		When I set Authorization header to token `logged_token`
		And  I set JSON body to
		"""
			{
				"vote": "`FAKEID`"
			}
		"""
		And  I POST to /api/game/`game_id`/vote
		Then response code should be 401
		And  response body should be valid json
