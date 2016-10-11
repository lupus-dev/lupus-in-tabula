import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { GameService } from './game.service';
import { UserService } from '../user/user.service';
import { SocketService } from '../shared/socket.service';
import { SessionService } from '../shared/session.service';

import { Game } from './game.model';

@Component({
	selector: 'lupus-game',
	templateUrl: 'app/game/game.component.html',
	providers: [GameService, UserService, SocketService]
})
export class GameComponent implements OnInit, OnDestroy {
	constructor(private gameService: GameService,
				private socketService: SocketService,
				private sessionService: SessionService,
				private router: Router,
				private route: ActivatedRoute,
				private slimLoadingBarService: SlimLoadingBarService) { }

	game: Game;
	isAdmin: boolean = false;
	isMember: boolean = false;
	socket: any;
	socketSubscription: any;

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.loadGame(params['game_id']);
		});
	}

	ngOnDestroy() {
		this.socketSubscription.unsubscribe();
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
		this.socketSubscription = this.socketService.connect('game').subscribe(
				socket => {
					this.socket = socket;
					socket.on('game:update', data => this.gameUpdate(data));
					socket.emit('game:select',
						{ game_id: this.game.game_id },
						(res) => {
							this.fillGame(res.game);
							console.log('Selected game ' + res.game.game_id, res.game);
						});
				},
				error => console.error(error)
			);
	}

	gameUpdate(data) {
		this.fillGame(data.game)
			.then(game => console.log('game:update', data, this.game));
	}

	fillGame(game) {
		return new Promise<Game>((resolve, reject) => {
			this.gameService.fillUsers([game])
				.then(games => {
					this.game = games[0];

					var user_id = this.sessionService.user.user_id;
					this.isAdmin = this.game.owner_id == user_id;
					this.isMember = false;
					for (let member of game.members)
						if (member && member.user_id == user_id)
							this.isMember = true;

					resolve(this.game);
				});
		});
	}
}
