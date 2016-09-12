import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent }   from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoggedUserComponent } from './shared/logged-user/logged-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

import { HttpClient } from './shared/http-client.service';
import { SessionService } from './shared/session.service';
import { LogoutService } from './shared/logout.service';
import { AuthGuard } from './shared/auth-guard.service';

import { routing } from './app.routing';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
	],
	declarations: [
		AppComponent,
		NavbarComponent,
		LoggedUserComponent,
		DashboardComponent,
		LoginComponent,
		UserComponent
	],
	providers: [
		CookieService,
		HttpClient,
		SessionService,
		LogoutService,
		AuthGuard
	],
	bootstrap:    [ AppComponent ]
})
export class AppModule { }