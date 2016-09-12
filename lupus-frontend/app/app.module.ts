import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { routing } from './app.routing';

@NgModule({
	imports:      [ BrowserModule, routing ],
	declarations: [ AppComponent, NavbarComponent, DashboardComponent ],
	bootstrap:    [ AppComponent ]
})
export class AppModule { }