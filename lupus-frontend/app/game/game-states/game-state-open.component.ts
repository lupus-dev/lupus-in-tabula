import { Component, Input } from '@angular/core';

import { GameService } from '../game.service';

import { Game } from '../game.model';

@Component({
	selector: 'lupus-game-state-open',
	templateUrl: 'app/game/game-states/game-state-open.component.html',
	providers: [GameService]
})
export class GameStateOpenComponent {

	constructor(private gameService: GameService) { }

	@Input() game: Game;
	@Input() isAdmin: boolean;

	closeGame() {
		this.gameService.closeGame(this.game.game_id);
	}
}
