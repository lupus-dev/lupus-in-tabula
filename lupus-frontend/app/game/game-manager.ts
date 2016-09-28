export class GameManager {
	constructor(private component) { }

	closeGame() {
		this.component.gameService.closeGame(this.component.game.game_id);
	}

	openGame() {
		this.component.gameService.openGame(this.component.game.game_id);
	}

	startGame() {
		this.component.gameService.startGame(this.component.game.game_id);
	}

	leaveGame() {
		this.component.gameService.leaveGame(this.component.game.game_id)
			.then(() => this.component.isMember = false)
			.catch(err => console.error(err));
	}

	joinGame() {
		this.component.gameService.joinGame(this.component.game.game_id)
			.then(() => this.component.isMember = true)
			.catch(err => console.error(err));
	}
}
