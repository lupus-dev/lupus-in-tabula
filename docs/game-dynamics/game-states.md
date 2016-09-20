# Game states

Each game has a `state` field that is self-sufficent to represent a running game.
The state contains also some information about ended games and not stated ones.

The status of the game is stored in the `status` field. This field has a required
attribute `code` that stores the running state of the game. It is a string that can
assume only these values:

- `draft` the game is just created and it can be customized by the owner. The game
	is not listed;
- `open` the owner of a game has completed the setup and the game has been marked as
	open so other players can join. The visibility level of the game can be specified
	in an other attribute of the state;
- `closed` the owner decided to stop other players joining the game. Only if the owner
	choose to reopen the game other user can join;
- `full` if the number of registered users reaches `max_players` the game automatically changes
	state to full. No other players can join the game and the game is not directly listed;
- `running` the owner has started the game. At this point the game cannot be changed
	nor any users can join;
- `ended` the game has ended because a team has won or beacause all the players are dead;
- `stopped` the game has been stopped because the owner has decided to retire or a fatal
	error forced the server to halt the game. A `message` attribute is set to explain what
	happened.

The allowed state changes are:
- `draft` &rightarrow; `open`
- `open` &rightarrow; `closed`, `full`, `running`
- `closed` &rightarrow; `open`, `running`
- `full` &rightarrow; `open`, `running`
- `running` &rightarrow; `ended`, `stopped`
