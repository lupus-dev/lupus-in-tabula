import { Component, Input } from '@angular/core';

import { Game } from '../game.model';

@Component({
	selector: 'lupus-game-state-draft',
	templateUrl: 'app/game/game-states/game-state-draft.component.html'
})
export class GameStateDraftComponent {
	@Input() game: Object;
	@Input() isAdmin: boolean;

	openGame() {
		console.log("open game");
	}
}
