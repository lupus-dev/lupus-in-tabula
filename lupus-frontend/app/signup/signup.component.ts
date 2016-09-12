import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
				private router: Router) { }

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
		else
			this.userService.signupUser(this.user)
				.then(user => {
					this.loginService.login(this.user)
						.then(() => this.router.navigate(['/']));
				})
				.catch(error => this.error = error.json()['error']);
	}
}