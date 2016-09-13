import { Component, OnInit } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { GameService } from './game.service';
import { UserService } from '../user/user.service';

import { Game } from './game.model';
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
			.then(games => this.processGames(games))
			.then(() => this.slimLoadingBarService.progress = 50)
			.catch(error => console.error(error));
	}

	private processGames(games) {
		let user_ids = {};

		for (let game of games) {
			user_ids[game.owner_id] = 1;
			for (let member of game.members)
				user_ids[member] = 1;
		}
		this.userService.getUsers(Object.keys(user_ids))
			.then(users => this.bindUsers(games, users))
			.catch(error => console.error(error));
	}

	private bindUsers(games, users) {
		this.games = [];
		for (let _game of games) {
			let game: Game = _game;
			game.owner = users[game.owner_id];
			game.members = (game.members as string[]).map(u => users[u] as User);
			this.games.push(game);
		}
		this.slimLoadingBarService.complete();
	}
}