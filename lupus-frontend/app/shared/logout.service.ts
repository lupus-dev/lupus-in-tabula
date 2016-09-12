import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from './http-client.service';
import { SessionService } from './session.service';

@Injectable()
export class LogoutService {
	constructor(private sessionService: SessionService,
				private http: HttpClient,
				private router: Router) { }

	logout() {
		this.http.delete('/users/session')
			.then(() => {
				this.sessionService.removeSession();
				this.router.navigate(['/login']);
			})
			.catch(error => console.log(error));
	}
}