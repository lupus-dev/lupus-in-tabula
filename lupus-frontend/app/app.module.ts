import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { SlimLoadingBarService, SlimLoadingBarComponent } from 'ng2-slim-loading-bar';

import { AppComponent }   from './app.component';
import { NotFoundComponent } from './shared/not-found.component';
import { LoadingComponent } from './shared/loading.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoggedUserComponent } from './shared/logged-user/logged-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameListElementComponent } from './game-list/game-list-element.component';
import { UserBadgeComponent } from './shared/user-badge/user-badge.component';
import { GameComponent } from './game/game.component';
import { NewGameComponent } from './new-game/new-game.component';
import { GameSplashComponent } from './game/game-splash.component';
import { MembersListComponent } from './game/members-list/members-list.component';
import { PlayersListComponent } from './game/players-list/players-list.component';
import { TemplaterComponent } from './templater/templater.component';

import { GameStateDraftComponent } from './game/game-states/game-state-draft.component';
import { GameStateOpenComponent } from './game/game-states/game-state-open.component';
import { GameStateClosedComponent } from './game/game-states/game-state-closed.component';
import { GameStateFullComponent } from './game/game-states/game-state-full.component';
import { GameStateRunningComponent } from './game/game-states/game-state-running.component';
import { GameStateEndedComponent } from './game/game-states/game-state-ended.component';

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
		LoadingComponent,
		NavbarComponent,
		LoggedUserComponent,
		DashboardComponent,
		LoginComponent,
		UserComponent,
		SignupComponent,
		GameListComponent,
		GameListElementComponent,
		UserBadgeComponent,
		GameComponent,
		NewGameComponent,
		GameSplashComponent,
		MembersListComponent,
		PlayersListComponent,
		TemplaterComponent,

		GameStateDraftComponent,
		GameStateOpenComponent,
		GameStateClosedComponent,
		GameStateFullComponent,
		GameStateRunningComponent,
		GameStateEndedComponent
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
