import { Component, Input } from '@angular/core';

@Component({
	selector: 'lupus-players-list',
	templateUrl: 'app/game/players-list/players-list.component.html',
	styles: ['table td { padding: 3px; }']
})
export class PlayersListComponent {

	constructor() { }

	@Input() game;

	get alive() {
		let members = [];
		for (let member of this.game.members)
			if (this.game.state.players[member.user_id].alive)
				members.push(member);
		return members;
	}

	get dead() {
		let members = [];
		for (let member of this.game.members)
			if (!this.game.state.players[member.user_id].alive)
				members.push(member);
		return members;
	}
}
