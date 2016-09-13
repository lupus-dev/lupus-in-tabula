import { Component } from '@angular/core';
// import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
	selector: 'lupus-app',
	templateUrl: 'app/app.component.html',
	styles: [ '#main-container { margin-top: 50px; }' ]
})
export class AppComponent {
	// These functions are instant because all the code is preloaded. When
	// there will be some lazyloading they could be meaningful
	//   constructor => router.events.subscribe(event => this.onRouteEvent(event));

	constructor(private slimLoadingBarService: SlimLoadingBarService) {
		setTimeout(() => {
			this.slimLoadingBarService.height = '4px';
			this.slimLoadingBarService.color = 'green';
		}, 0);
	}

	// onRouteEvent(event) {
	// 	if (event instanceof NavigationStart)
	// 		this.slimLoadingBarService.start();
	// 	if (event instanceof NavigationEnd)
	// 		this.slimLoadingBarService.complete();
	// }
}