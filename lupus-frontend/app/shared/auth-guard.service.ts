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
		if (state.url === '/login') {
			if (isLoggedIn) {
				this.router.navigate(['/']);
				return false;
			}
			return true;
		}

		if (!isLoggedIn) {
			this.router.navigate(['/login']);
			return false;
		}
		return true;
	}
}