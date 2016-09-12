import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Session } from './session.model';
import { HttpClient } from './http-client.service';

@Injectable()
export class SessionService {
	constructor(private cookieService: CookieService,
				private http: HttpClient,
				private router: Router) {
		this.getSession();
		if (this.session)
			this.loadUser();
	}

	session: Session;
	user: Object;

	getSession(): Session {
		let cookie = this.cookieService.getObject('session');
		if (!cookie) return null;

		this.http.setToken(cookie['token']);
		return this.session = {
			token: cookie['token'],
			user_id: cookie['user_id'],
			expire_date: new Date(cookie['expire_date'])
		};
	}

	saveSession(data: Object) {
		this.cookieService.putObject('session', data['session']);
		this.session = data['session'];
		this.user = data['user'];
		this.http.setToken(this.session.token);
	}

	removeSession() {
		this.cookieService.remove('session');
		this.session = null;
		this.user = null;
		this.http.setToken(null);
	}

	loadUser() {
		this.http.get('/users/me')
			.forEach(response => this.user = response.json())
			.catch(error => console.error(error));
	}
}