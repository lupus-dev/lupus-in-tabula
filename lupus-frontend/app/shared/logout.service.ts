import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { HttpClient } from './http-client.service';
import { SessionService } from './session.service';

@Injectable()
export class LogoutService {
	constructor(private sessionService: SessionService,
				private http: HttpClient,
				private router: Router,
				private slimLoadingBarService: SlimLoadingBarService) { }

	logout() {
		this.slimLoadingBarService.start();
		this.http.delete('/api/users/session')
			.then(() => {
				this.slimLoadingBarService.complete();
				this.sessionService.removeSession();
				this.router.navigate(['/login']);
			})
			.catch(error => {
				this.slimLoadingBarService.complete();
				console.log(error)
			});
	}
}