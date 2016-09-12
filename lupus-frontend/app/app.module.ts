import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
	imports:      [ BrowserModule ],
	declarations: [ AppComponent, NavbarComponent ],
	bootstrap:    [ AppComponent ]
})
export class AppModule { }