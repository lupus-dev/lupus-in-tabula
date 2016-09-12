import { Injectable } from '@angular/core';

import { Credential } from './credential.model';

import { HttpClient } from '../shared/http-client.service';
import { SessionService } from '../shared/session.service';

@Injectable()
export class LoginService {
	constructor(private http : HttpClient,
				private sessionService : SessionService) { }

	login(credential: Credential) {
		return this.http.post('/users/session', credential)
			.then(res => this.sessionService.saveSession(res))
			.catch(err => Promise.reject(err['error']));
	}
}