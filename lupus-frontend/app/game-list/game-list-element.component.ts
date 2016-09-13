import { Component, Input } from '@angular/core';

import { Game } from './game.model';

@Component({
	selector: 'lupus-game-list-element',
	templateUrl: 'app/game-list/game-list-element.component.html'
})
export class GameListElementComponent {
	@Input() game: Game;

	gameLabel(): string {
		let code = this.game.state.status.code;
		switch (code) {
			case 'draft':   return 'panel-default';
			case 'open':    return 'panel-primary';
			case 'closed':  return 'panel-warning';
			case 'full':    return 'panel-warning';
			case 'running': return 'panel-success';
			case 'ended':   return 'panel-info';
			case 'stopped': return 'panel-danger';
		}
		return 'panel-danger';
	}
}