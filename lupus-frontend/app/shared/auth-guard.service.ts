import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot,
	RouterStateSnapshot } from '@angular/router';

import { SessionService } from './session.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private sessionService: SessionService,
				private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		let isLoggedIn = !!this.sessionService.session;
		if (state.url === '/login' || state.url === '/signup') {
			if (isLoggedIn) {
				this.router.navigate(['/']);
				console.error('Not allowed because already logged in!');
				return false;
			}
			return true;
		}

		if (!isLoggedIn) {
			this.router.navigate(['/login']);
			console.error('Not allowed because not logged in!');
			return false;
		}
		return true;
	}
}