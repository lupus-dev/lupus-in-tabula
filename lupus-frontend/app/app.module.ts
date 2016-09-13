import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { SlimLoadingBarService, SlimLoadingBarComponent } from 'ng2-slim-loading-bar';

import { AppComponent }   from './app.component';
import { NotFoundComponent } from './shared/not-found.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoggedUserComponent } from './shared/logged-user/logged-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameListElementComponent } from './game-list/game-list-element.component';
import { UserBadgeComponent } from './shared/user-badge/user-badge.component';

import { HttpClient } from './shared/http-client.service';
import { AuthGuard } from './shared/auth-guard.service';
import { SessionService } from './shared/session.service';
import { LogoutService } from './shared/logout.service';

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
		SlimLoadingBarComponent,
		NotFoundComponent,
		NavbarComponent,
		LoggedUserComponent,
		DashboardComponent,
		LoginComponent,
		UserComponent,
		SignupComponent,
		GameListComponent,
		GameListElementComponent,
		UserBadgeComponent
	],
	providers: [
		SlimLoadingBarService,
		CookieService,
		HttpClient,
		SessionService,
		LogoutService,
		AuthGuard
	],
	bootstrap:    [ AppComponent ]
})
export class AppModule { }