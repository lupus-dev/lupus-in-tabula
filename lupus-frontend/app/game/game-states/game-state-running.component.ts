import { Component, Input } from '@angular/core';

import { Game } from '../game.model';

@Component({
	selector: 'lupus-game-state-running',
	templateUrl: 'app/game/game-states/game-state-running.component.html'
})
export class GameStateRunningComponent {

	constructor() { }

	@Input() game: Game;
	@Input() isAdmin: boolean;
	@Input() isMember: boolean;
}
