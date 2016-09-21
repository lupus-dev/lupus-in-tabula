import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { GameService } from './game.service';
import { UserService } from '../user/user.service';
import { SocketService } from '../shared/socket.service';

import { Game } from './game.model';

@Component({
	selector: 'lupus-game',
	templateUrl: 'app/game/game.component.html',
	providers: [GameService, UserService, SocketService]
})
export class GameComponent implements OnInit, OnDestroy {
	constructor(private gameService: GameService,
				private socketService: SocketService,
				private router: Router,
				private route: ActivatedRoute,
				private slimLoadingBarService: SlimLoadingBarService) { }

	game: Game;
	socket: any;

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.loadGame(params['game_id']);
		});
	}

	ngOnDestroy() {
		this.socketService.disconnect('game');
	}

	loadGame(game_id: string) {
		this.slimLoadingBarService.start();
		this.gameService.getGames([game_id])
			.then(games => {
				this.slimLoadingBarService.progress = 50;
				this.fillGame(games[game_id])
					.then(game => {
						this.slimLoadingBarService.complete()
						this.connectToSocket();
					});
			})
			.catch(error => this.router.navigate(['/404']));
	}

	connectToSocket() {
		this.socketService.connect('game')
			.then((socket) => {
				this.socket = socket;
				socket.on('game:update', data => this.gameUpdate(data));
				socket.emit('game:select',
					{ game_id: this.game.game_id },
					(res) => this.fillGame(res.game));
			})
			.catch((err) => console.error(err));
	}

	gameUpdate(data) {
		this.fillGame(data.game);
	}

	fillGame(game) {
		return new Promise<Game>((resolve, reject) => {
			this.gameService.fillUsers([game])
				.then(games => {
					this.game = games[0];
					resolve(this.game);
				});
		});
	}
}
