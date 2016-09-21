import { Component, Input } from '@angular/core';

import { Game } from '../game.model';

@Component({
	selector: 'lupus-game-state-open',
	templateUrl: 'app/game/game-states/game-state-open.component.html'
})
export class GameStateOpenComponent {
	@Input() game: Object;
	@Input() isAdmin: boolean;
}
