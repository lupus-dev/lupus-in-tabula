import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

import { UserService } from '../user/user.service';

@Component({
	selector: 'lupus-templater',
	templateUrl: 'app/templater/templater.component.html',
	providers: [UserService]
})
export class TemplaterComponent implements OnChanges {
	constructor(private userService: UserService) { }

	@Input() rawTemplate: any = [];

	template: any[] = [];

	ngOnChanges(changes) {
		if (!changes.rawTemplate) return;

		this.template = [];
		for (let rawChunk of changes.rawTemplate.currentValue) {
			let chunk = rawChunk;

			if (chunk.type == 'user')
				this.userService.getUsers([chunk.data])
					.then(users => chunk.extraData = users[chunk.data]);

			this.template.push(chunk);
		}
	}
}
