import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../session.service';

@Component({
	selector: 'lupus-navbar',
	templateUrl: 'app/shared/navbar/navbar.component.html'
})
export class NavbarComponent {
	constructor(public router: Router,
				public sessionService: SessionService) { }

	isLoggedIn(): boolean {
		return !!this.sessionService.session;
	}

	isActiveRoute(route: string) : boolean {
		return this.router.url == route;
	}
}
