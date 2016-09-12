import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'lupus-navbar',
	templateUrl: 'app/shared/navbar/navbar.component.html'
})
export class NavbarComponent {
	constructor(public router: Router) { }

	isActiveRoute(route: string) : boolean {
		return this.router.url == route;
	}
}