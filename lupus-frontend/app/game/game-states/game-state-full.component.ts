import { Component, Input } from '@angular/core';

import { GameService } from '../game.service';
import { SessionService } from '../../shared/session.service';

import { GameManager } from '../game-manager';

import { Game } from '../game.model';

@Component({
	selector: 'lupus-game-state-full',
	templateUrl: 'app/game/game-states/game-state-full.component.html',
	providers: [GameService]
})
export class GameStateFullComponent {

	constructor(private gameService: GameService) {
		this.gameManager = new GameManager(this);
	}

	private gameManager: GameManager;

	@Input() game: Game;
	@Input() isAdmin: boolean;
	@Input() isMember: boolean;

	leaveGame() {
		this.gameManager.leaveGame();
	}

	startGame() {
		this.gameManager.startGame();
	}
}
