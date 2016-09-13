import { Component, Input } from '@angular/core';

import { User } from '../../user/user.model';

@Component({
	selector: 'lupus-user-badge',
	templateUrl: 'app/shared/user-badge/user-badge.component.html',
	styles: [ 'a:hover, a:focus { text-decoration: none; }' ]
})
export class UserBadgeComponent {
	@Input() user: User;
	@Input() currentUser: boolean = false;

	labelClass() {
		if (this.user.level <= 2)
			return 'label-default';
		if (this.user.level <= 4)
			return 'label-primary';
		if (this.user.level <= 6)
			return 'label-success';
		return 'label-danger';
	}
}