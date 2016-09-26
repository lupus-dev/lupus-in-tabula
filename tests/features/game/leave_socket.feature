@game
Feature:

	If a user leave a game there should be a proper game:update

	@clean
	Scenario: The user leave successfully
		Given I am logged as
		| username | "edomora97" |
		And   There was a game in the database game_id
		| name     | "Wow!!"     |
		| members  | ["`logged_user_id`", "`FAKEID`"] |

		When I connect to game socket
		And  I send authorization token `logged_token`
		Then I should be authenticated
		When I send to the socket the game:select event
		| game_id | "`game_id`" |
		And  I should be able to receive a game:update

		When I set Authorization header to token `logged_token`
		And  I DELETE /api/game/`game_id`/leave
		Then response code should be 200

		And  The game:update event should be
		| type         | "LEAVE_MEMBER"      |
		| data.user_id | "`logged_user_id`" |
		| game.members.length | 1           |

	@clean
	Scenario: The game was full
		Given I am logged as
		| username | "edomora97" |
		And   There was a game in the database game_id
		| name           | "Wow!!"     |
		| gen_info.max_players | 2     |
		| members  | ["`logged_user_id`", "`FAKEID`"] |
		| state.status.code | "full" |

		When I connect to game socket
		And  I send authorization token `logged_token`
		And  I should be authenticated
		And  I send to the socket the game:select event
		| game_id | "`game_id`" |
		And  I should be able to receive a game:update

		And  I set Authorization header to token `logged_token`
		And  I DELETE /api/game/`game_id`/leave
		And  response code should be 200

		Then The game:update event should be
		| type         | "LEAVE_MEMBER"     |
		| data.user_id | "`logged_user_id`" |
		| game.members.length | 1           |
		| game.state.status.code | "full"   |

		And  The game:update event should be
		| type         | "GAME_STATUS_CHANGED" |
		| data.status.code | "open"            |
		| game.state.status.code | "open"      |
