import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { UserService } from '../user/user.service';
import { LoginService } from '../login/login.service';

import { Signup } from './signup.model';

@Component({
	selector: 'lupus-signup',
	templateUrl: 'app/signup/signup.component.html',
	providers: [ UserService, LoginService ]
})
export class SignupComponent {
	constructor(private userService: UserService,
				private loginService: LoginService,
				private router: Router,
				private slimLoadingBarService: SlimLoadingBarService) { }

	error: string;

	user: Signup = {
		username: '',
		password: '',
		password2: '',
		name: '',
		surname: ''
	};

	onSignup(event) {
		if (this.user['password'] !== this.user['password2'])
			this.error = "The passwords inserted don't match!";
		else {
			this.slimLoadingBarService.start();
			this.userService.signupUser(this.user)
				.then(user => {
					this.loginService.login(this.user)
						.then(() => this.slimLoadingBarService.complete())
						.then(() => this.router.navigate(['/']));
				})
				.then(() => this.slimLoadingBarService.progress = 50)
				.catch(error => {
					this.slimLoadingBarService.complete();
					this.error = error.json()['error']
				});
		}
	}
}