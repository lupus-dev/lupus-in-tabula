import { Injectable } from '@angular/core';

import { HttpClient } from '../shared/http-client.service';

import { User } from './user.model';
import { Signup } from '../signup/signup.model';

@Injectable()
export class UserService {
	constructor(private http: HttpClient) { }

	getUsers(user_ids: string[]) : Promise<User> {
		return this.http.get('/users/' + user_ids.join(','));
	}

	signupUser(user: Signup) {
		return this.http.post('/users', user);
	}
}