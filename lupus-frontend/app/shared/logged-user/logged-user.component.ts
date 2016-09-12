import { Component } from '@angular/core';

import { SessionService } from '../session.service';
import { LogoutService } from '../logout.service';

import { Session } from '../session.model';

@Component({
	selector: '[lupus-logged-user]',
	templateUrl: 'app/shared/logged-user/logged-user.component.html'
})
export class LoggedUserComponent {
	constructor(private sessionService: SessionService,
				private logoutService: LogoutService) { }

	logout(event) {
		event.preventDefault();
		this.logoutService.logout();
	}
}