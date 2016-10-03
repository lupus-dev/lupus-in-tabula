@game
Feature:

	If the owner starts a game the sockets should be notified with a game:update

	@clean
	Scenario: The owner starts the game successfully
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

		When I connect to game socket
		And  I send authorization token `logged_token`
		Then I should be authenticated
		When I send to the socket the game:select event
		| game_id | "`game_id`" |
		And  I should be able to receive a game:update

		When I set Authorization header to token `logged_token`
		And  I set JSON body to
		"""
			{
				"vote": "`other_user`"
			}
		"""
		And  I POST to /api/game/`game_id`/vote
		Then response code should be 200

		And  The game:update event should be
		| type      | "PRIVATE_VOTE" |
		| data.vote.vote | "`other_user`" |
		| game.state.votes.0.user_id | "`logged_user_id`" |
		| game.state.votes.0.vote    | "`other_user`"     |
