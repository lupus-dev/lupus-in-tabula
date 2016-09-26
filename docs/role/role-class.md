# Role class structure

The Role class defines how a group of players plays in the game. The classes that represent a role should extend the base `Role` class. In fact the `Engine` uses the public interface by the `Role` class.

## Public static properties

- `role_id` a unique string that identify the role
- `role_name` the name of the role displayed to the user
- `team_id` the id of the team that the role belongs to
- `mana` a field that can be `black` or `white` if the role is or not evil
- `priority_night` a number that express the order of execution in the night
- `priority_day` the same as `priority_night` but for the daily votation

## Public properties

- `engine` the engine that runs the game

## Public abstract methods

- `splash()` a methods that returns a set of messages to be displayed to the player
- `needVote()` a method that returns true if the player needs to vote in the current game
- `performAction()` a method that apply the player's vote
- `isVoteValid(vote)` check if a vote is valid

## Protected methods

- `getData()` return the player's data stored in the state
- `setData(data)` store the player's data in the state
- `getVote()` return the player's vote for the current day
- `kill(user_id)` tries to kill a player
- `visit(user_id)` mark the user as visited by the player in the current day
- `protect(protected, killer)` protect a user or a group of user by a killer
- `isProtected(player, killer)` check if a player is protected by a killer
