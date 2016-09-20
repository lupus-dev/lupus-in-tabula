import { Component, OnInit } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { GameService } from '../game/game.service';
import { UserService } from '../user/user.service';

import { Game } from '../game/game.model';
import { User } from '../user/user.model';

@Component({
	selector: 'lupus-game-list',
	templateUrl: 'app/game-list/game-list.component.html',
	providers: [GameService, UserService]
})
export class GameListComponent implements OnInit {

	constructor(private gameService: GameService,
				private userService: UserService,
				private slimLoadingBarService: SlimLoadingBarService) { }

	games: Game[];

	ngOnInit() {
		this.slimLoadingBarService.start();
		this.gameService.getAllGames()
			.then(games => {
				if (games.length > 0) {
					this.slimLoadingBarService.progress = 50;
					this.gameService.fillUsers(games)
						.then(games => {
							this.games = games;
							this.slimLoadingBarService.complete();
						})
						.catch(error => console.error(error));
				} else {
					this.games = [];
					this.slimLoadingBarService.complete();
				}
			})
			.catch(error => console.error(error));
	}
}
