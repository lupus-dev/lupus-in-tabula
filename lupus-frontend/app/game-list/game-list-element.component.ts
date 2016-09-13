import { Component, Input } from '@angular/core';

import { Game } from './game.model';

@Component({
	selector: 'lupus-game-list-element',
	templateUrl: 'app/game-list/game-list-element.component.html'
})
export class GameListElementComponent {
	@Input() game: Game;
}