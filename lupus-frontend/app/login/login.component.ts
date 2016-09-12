import { Component } from '@angular/core';

import { LoginService } from './login.service';
import { SessionService } from '../shared/session.service';

import { Credential } from './credential.model';

@Component({
	selector: 'lupus-login',
	templateUrl: 'app/login/login.component.html',
	providers: [ LoginService ]
})
export class LoginComponent {
	constructor(private loginService: LoginService,
				private sessionService: SessionService) {
		this.user = sessionService.user;
	}

	user: Object;

	credentials: Credential = {
		username: '',
		password: ''
	}

	onLogin(event: Event): boolean {
		this.loginService.login(this.credentials);
		return false;
	}
}