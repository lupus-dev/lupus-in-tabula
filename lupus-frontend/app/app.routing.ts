import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/auth-guard.service';

import { NotFoundComponent } from './shared/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { GameComponent } from './game/game.component';
import { NewGameComponent } from './new-game/new-game.component';

const appRoutes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'signup',
		component: SignupComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'user/:user_id',
		component: UserComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'user',
		component: UserComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'game/new',
		component: NewGameComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'game/:game_id',
		component: GameComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '',
		component: DashboardComponent,
		pathMatch: 'full',
		canActivate: [AuthGuard]
	},
	{
		path: '404',
		component: NotFoundComponent
	},
	{
		path: '**',
		redirectTo: '/404'
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);