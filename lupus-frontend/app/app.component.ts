import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
	selector: 'lupus-app',
	templateUrl: 'app/app.component.html',
	styles: [ '#main-container { margin-top: 50px; }' ]
})
export class AppComponent {
	constructor(private router: Router,
				private slimLoadingBarService: SlimLoadingBarService) {
		router.events.subscribe(event => this.onRouteEvent(event));
	}

	onRouteEvent(event) {
		if (event instanceof NavigationStart)
			this.slimLoadingBarService.start();
		if (event instanceof NavigationEnd)
			this.slimLoadingBarService.complete();
	}
}