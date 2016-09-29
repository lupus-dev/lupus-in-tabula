@game
Feature:

	If the owner starts a game the sockets should be notified with a game:update

	@clean
	Scenario: The owner starts the game successfully
		Given I am logged as
		| username | "edomora97" |
		Given There was a game in the database game_id
		| name                 | "Wow!!"                          |
		| owner_id             | "`logged_user_id`"               |
		| members              | ["`logged_user_id`", "`FAKEID`"] |
		| state.status.code    | "open"                           |
		| gen_info.min_players | 2                                |
		| gen_info.max_players | 3                                |

		When I connect to game socket
		And  I send authorization token `logged_token`
		Then I should be authenticated
		When I send to the socket the game:select event
		| game_id | "`game_id`" |
		And  I should be able to receive a game:update

		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/`game_id`/start
		Then response code should be 200

		And  The game:update event should be
		| type         | "GAME_STATUS_CHANGED" |
		| data.status.code | "running"         |
		| game.state.status.code | "running"   |

		And  The game:update event should be
		| type         | "GAME_STARTED"        |
		| game.state.status.code                    | "running" |
		| game.state.players.`logged_user_id`.alive | true      |
		| game.state.players.`FAKEID`.alive         | true      |
		| game.state.day                            | 1         |
