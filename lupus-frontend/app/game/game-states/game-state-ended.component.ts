import { Component, Input } from '@angular/core';

import { Game } from '../game.model';

@Component({
	selector: 'lupus-game-state-ended',
	templateUrl: 'app/game/game-states/game-state-ended.component.html'
})
export class GameStateEndedComponent {
	@Input() game: Game;
}
