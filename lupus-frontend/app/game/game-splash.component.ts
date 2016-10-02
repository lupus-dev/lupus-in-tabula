import { Component, Input } from '@angular/core';

import { SessionService } from '../shared/session.service';

@Component({
	selector: 'lupus-game-splash',
	template: '<div>{{splash}}</div>'
})
export class GameSplashComponent {

	constructor(private sessionService: SessionService) { }

	@Input() game;

	get splash() {
		let user_id = this.sessionService.session.user_id;
		let player = this.game.state.players[user_id];
		if (!player || !player.extra) return '';
		return player.extra.splash;
	}
}
