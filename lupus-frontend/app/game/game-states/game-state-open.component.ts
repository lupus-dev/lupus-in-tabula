import { Component, Input } from '@angular/core';

import { GameService } from '../game.service';
import { SessionService } from '../../shared/session.service';

import { GameManager } from '../game-manager';

import { Game } from '../game.model';

@Component({
	selector: 'lupus-game-state-open',
	templateUrl: 'app/game/game-states/game-state-open.component.html',
	providers: [GameService]
})
export class GameStateOpenComponent {

	constructor(private gameService: GameService) {
		this.gameManager = new GameManager(this);
	}

	private gameManager: GameManager;

	@Input() game: Game;
	@Input() isAdmin: boolean;
	@Input() isMember: boolean;

	closeGame() {
		this.gameManager.closeGame();
	}

	leaveGame() {
		this.gameManager.leaveGame();
	}

	joinGame() {
		this.gameManager.joinGame();
	}

	startGame() {
		this.gameManager.startGame();
	}
}
