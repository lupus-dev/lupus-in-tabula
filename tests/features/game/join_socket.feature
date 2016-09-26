@game
Feature:

	If a user join a game there should be a proper game:update

	@clean
	Scenario: The user join successfully
		Given I am logged as
		| username | "edomora97" |
		And   There was a game in the database game_id
		| name     | "Wow!!"     |

		When I connect to game socket
		And  I send authorization token `logged_token`
		Then I should be authenticated
		When I send to the socket the game:select event
		| game_id | "`game_id`" |
		And  I should be able to receive a game:update

		When I set Authorization header to token `logged_token`
		And  I POST to /api/game/`game_id`/join
		Then response code should be 200

		And  The game:update event should be
		| type         | "JOIN_MEMBER"      |
		| data.user_id | "`logged_user_id`" |
		| game.members.length | 2           |

	@clean
	Scenario: The game became full
		Given I am logged as
		| username | "edomora97" |
		And   There was a game in the database game_id
		| name           | "Wow!!"     |
		| gen_info.max_players | 2     |

		When I connect to game socket
		And  I send authorization token `logged_token`
		And  I should be authenticated
		And  I send to the socket the game:select event
		| game_id | "`game_id`" |
		And  I should be able to receive a game:update

		And  I set Authorization header to token `logged_token`
		And  I POST to /api/game/`game_id`/join
		And  response code should be 200

		Then The game:update event should be
		| type         | "JOIN_MEMBER"      |
		| data.user_id | "`logged_user_id`" |
		| game.members.length | 2           |
		| game.state.status.code | "open"   |

		And  The game:update event should be
		| type         | "GAME_STATUS_CHANGED" |
		| data.status.code | "full"            |
		| game.state.status.code | "full"      |
