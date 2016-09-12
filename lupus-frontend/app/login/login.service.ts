import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { Session } from '../shared/session.model';
import { Credential } from './credential.model';

import { HttpClient } from '../shared/http-client.service';
import { SessionService } from '../shared/session.service';

@Injectable()
export class LoginService {
	constructor(private http : HttpClient,
				private sessionService : SessionService) { }

	login(credential: Credential) {
		return this.http.post('/users/session', credential)
			.forEach(response => this.sessionService.saveSession(response.json()))
			.catch(response => Promise.reject(response.json()['error']));
	}
}