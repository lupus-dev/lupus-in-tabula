# Events that happen in a game

## +game:update

The server sends to the client (or the clients) some information because the game state has changed. When a player do something in the game the server stores the data and, if necessary, send this event to the interested clients.

The information sent are:
- `game` The complete game data as seen by the user. The client should rely on this object because it's the last snapshot of the game for the server.
- `changes` This object has the same structure of the `game` but all the untouched properties are removed.
- `update_type` This attribute is a string that identify which update has made. The value that it can assume is:
    - `GAME_STATUS_CHANGED` The status of the game (draft, running...) has changed
	- `ADDED_MEMBER` A new member has joined the game
	- `REMOVED_MEMBER` A member of the game has left
	- `NEXT_DAY` The game day has gone forward, maybe some players are dead
	- `DEATH_BY_OTHER` A player was killed by something odd like a kick, a ban or by the admin
	- `PUBLIC_VOTE` A public votation has been done