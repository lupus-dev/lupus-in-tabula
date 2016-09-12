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
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}