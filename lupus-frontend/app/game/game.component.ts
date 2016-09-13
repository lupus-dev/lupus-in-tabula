import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { GameService } from './game.service';
import { UserService } from '../user/user.service';

import { Game } from './game.model';

@Component({
	selector: 'lupus-game',
	templateUrl: 'app/game/game.component.html',
	providers: [GameService, UserService]
})
export class GameComponent implements OnInit {
	constructor(private gameService: GameService,
				private router: Router,
				private route: ActivatedRoute,
				private slimLoadingBarService: SlimLoadingBarService) { }

	game: Game;

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.slimLoadingBarService.start();
			let game_id = params['game_id'];

			this.gameService.getGames([game_id])
				.then(games => {
					this.slimLoadingBarService.progress = 50;
					this.gameService.fillUsers([games[game_id]])
						.then(games => this.game = games[0])
						.then(() => this.slimLoadingBarService.complete())
				})
				.catch(error => this.router.navigate(['/404']));
		})
	}
}