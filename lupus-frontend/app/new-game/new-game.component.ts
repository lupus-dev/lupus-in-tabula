import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../game/game.service';
import { UserService } from '../user/user.service';

import { Game } from '../game/game.model';

@Component({
	selector: 'lupus-new-game',
	templateUrl: 'app/new-game/new-game.component.html',
	providers: [GameService, UserService]
})
export class NewGameComponent {
	constructor(private gameService: GameService,
				private router: Router) { }

	error: string;
	game = {
		name: '',
		gen_info: {
			min_players: 5,
			max_players: 10
		}
	};

	onNewGame(event) {
		event.preventDefault();
		this.gameService.saveGame(this.game)
			.then(game => this.router.navigate(['/game', game.game_id]))
			.catch(error => this.error = error['error']);
	}
}