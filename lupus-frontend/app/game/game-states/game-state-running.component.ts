import { Component, Input, OnChanges } from '@angular/core';

import { SessionService } from '../../shared/session.service';
import { UserService } from '../../user/user.service';

import { Game } from '../game.model';

@Component({
	selector: 'lupus-game-state-running',
	templateUrl: 'app/game/game-states/game-state-running.component.html',
	providers: [UserService]
})
export class GameStateRunningComponent implements OnChanges {

	constructor(private sessionService: SessionService,
				private userService: UserService) { }

	@Input() game: Game;
	@Input() isAdmin: boolean;
	@Input() isMember: boolean;

	votables = [];

	get player() {
		let user_id = this.sessionService.session.user_id;
		return this.game.state.players[user_id];
	}

	getVotables() {
		if (!this.player.extra || !this.player.extra.needVote) return;
		let votables_list = this.player.extra.needVote.votables;

		let users = [];
		for (let votable of votables_list)
			if (votable.value && !votable.text)
				users.push(votable.value);
		console.log(users);
		return new Promise<any>((resolve, reject) => {
			let votables = [];
			this.userService.getUsers(users)
				.then(users => {
					for (let votable of votables_list) {
						if (votable.value && !votable.text)
							votable.text = (users[votable.value] || {}).username;
						votables.push(votable);
					}
					this.votables = votables;
					resolve(votables);
				});
		});
	}

	ngOnChanges(changes) {
		if (changes.game)
			setTimeout(() => this.getVotables(), 0);
	}
}
