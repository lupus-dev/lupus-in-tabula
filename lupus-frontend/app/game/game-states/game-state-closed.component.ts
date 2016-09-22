import { Component, Input } from '@angular/core';

import { GameService } from '../game.service';

import { Game } from '../game.model';

@Component({
	selector: 'lupus-game-state-closed',
	templateUrl: 'app/game/game-states/game-state-closed.component.html',
	providers: [GameService]
})
export class GameStateClosedComponent {

	constructor(private gameService: GameService) { }

	@Input() game: Game;
	@Input() isAdmin: boolean;

	openGame() {
		this.gameService.openGame(this.game.game_id);
	}
}
