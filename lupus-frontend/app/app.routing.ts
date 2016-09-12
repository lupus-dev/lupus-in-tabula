import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/auth-guard.service';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '',
		component: DashboardComponent,
		pathMatch: 'full',
		canActivate: [AuthGuard]
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);