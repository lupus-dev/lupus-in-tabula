# How the engine works

There is a static class `EngineManager` that creates and destroys `Engine` instances. When a piece of the application needs the `Engine`, the `EngineManager` creates a new instance only if it is not cached. When all the clients socket of a game disconnect, the _final countdown_ of the Engine begins, after a number of seconds the Engine instance will be deallocated.

## EngineManager

This static class exposes some APIs:

- `getEngine(game_id)` returns a `Promise<Engine>` that will be resolved with the Engine instance. If the Engine is not cached it will be created.

- `registerSocket(game_id, socket)` bind the events for the given game and the given socket. This binding allows the EngineManager to deallocate the Engine when needed.

## Engine

The Engine is the brain of a game. It checks when a game needs an update and listen for the input of the users. Only this class is allowed to change a Game instance, in fact in this way it will be easier to make the application distributed.

All the game updates are stored in an Update Queue that will be flushed sending the events only to the interested clients.

The APIs that this class exposes are:

- `init(game_id)` returns a `Promise<void>`
- `checkProgess()` returns a `Promise<?>`
- `events` is an EventEmitter that allows the application to interact with the game:
	- Each call to `emit` on this EventEmitter has to specify the following data:
		- `event` the event name
		- `data` an object with the data to send to event handler
		- `callback` an optional callback that will be always called when the event is processed
	- Each binding with the `on` method has the following signature:
		- `data` the data passed by the emitter
		- `callback` an optional function that **has to be called** even on failure
- `registerSocket(socket)` register the socket to the game. All the rooms for the socket are set here and all the events are bound here.

### Engine events

- `game:add_member { user_id }` add the user to the game members
- `game:remove_member { user_id }` remove the user from the game members
