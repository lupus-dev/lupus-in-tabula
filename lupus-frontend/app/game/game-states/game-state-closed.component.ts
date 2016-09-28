import { Component, Input } from '@angular/core';

import { GameService } from '../game.service';
import { SessionService } from '../../shared/session.service';

import { GameManager } from '../game-manager';

import { Game } from '../game.model';

@Component({
	selector: 'lupus-game-state-closed',
	templateUrl: 'app/game/game-states/game-state-closed.component.html',
	providers: [GameService]
})
export class GameStateClosedComponent {

	constructor(private gameService: GameService) {
		this.gameManager = new GameManager(this);
	}

	private gameManager: GameManager;

	@Input() game: Game;
	@Input() isAdmin: boolean;
	@Input() isMember: boolean;

	openGame() {
		this.gameManager.openGame();
	}

	leaveGame() {
		this.gameManager.leaveGame();
	}

	startGame() {
		this.gameManager.startGame();
	}
}
