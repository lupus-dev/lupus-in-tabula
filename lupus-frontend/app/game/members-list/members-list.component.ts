import { Component, Input } from '@angular/core';

@Component({
	selector: 'lupus-members-list',
	templateUrl: 'app/game/members-list/members-list.component.html'
})
export class MembersListComponent {

	constructor() { }

	@Input() game;
}
