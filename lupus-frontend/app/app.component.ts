import { Component } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
	selector: 'lupus-app',
	templateUrl: 'app/app.component.html',
	styles: [ '#main-container { margin-top: 50px; }' ]
})
export class AppComponent {
	constructor(private slimLoadingBarService: SlimLoadingBarService) {
		setTimeout(() => {
			this.slimLoadingBarService.height = '4px';
			this.slimLoadingBarService.color = 'green';
		}, 0);
	}
}
