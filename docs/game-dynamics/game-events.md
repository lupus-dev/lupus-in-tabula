# Events that happen in a game

## +game:update

The server sends to the client (or the clients) some information because the game state has changed. When a player do something in the game the server stores the data and, if necessary, send this event to the interested clients.

The information sent are:
- `game` The complete game data as seen by the user. The client should rely on this object because it's the last snapshot of the game for the server.
- `data` The data associated with the event
- `type` This attribute is a string that identify which update has made. The value that it can assume is:
    - `GAME_STATUS_CHANGED` The status of the game (draft, running...) has changed
	- `JOIN_MEMBER` A new member has joined the game
	- `LEAVE_MEMBER` A member of the game has left
	- `GAME_STARTED` The owner has started the game
	- `NEXT_DAY` The game day has gone forward, maybe some players are dead
	- `DEATH_BY_OTHER` A player was killed by something odd like a kick, a ban or by the admin
	- `PUBLIC_VOTE` A public votation has been done
	- `PRIVATE_VOTE` The user is informed by a private votation

## -game:select

The client, after connecting, ask the server to select a specific game, if it accept the request then the game instance is sent back to the client. All the game specific initialization is done in this phase.

The information sent are:
- `game_id` The id of the selected game

The information received are:
- `status` This property is set to `true` if the request has completed correctly, `false` otherwise
- `error` In case of an error this property is set
- `game` In case of success the game property is set
