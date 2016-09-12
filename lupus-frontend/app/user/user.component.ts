import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from './user.service';
import { SessionService } from '../shared/session.service';

import { User } from './user.model';

@Component({
	selector: 'lupus-user',
	templateUrl: 'app/user/user.component.html',
	providers: [ UserService ]
})
export class UserComponent implements OnInit {
	constructor(private sessionService: SessionService,
				private route: ActivatedRoute,
				private userService: UserService) { }

	user: User;

	ngOnInit() {
		this.route.params.subscribe(params => {
			if (!params['user_id'] && this.sessionService.user)
				this.user = this.sessionService.user;
			else {
				let user_id = params['user_id'] || this.sessionService.session.user_id;

				this.userService.getUsers([user_id])
					.then(user => this.user = user[user_id])
					.catch(error => console.error(error));
			}
		})
	}
}