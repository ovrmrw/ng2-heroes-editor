import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { Page1Component } from '../page1/page1.component';
import { Page2Component } from '../page2/page2.component';

import { Dispatcher, Store } from '../store';
import { Page1Service } from '../page1/page1.service';
import { Page2Service } from '../page2/page2.service';


@NgModule({
  imports: [BrowserModule, FormsModule, routing],
  declarations: [AppComponent, Page1Component, Page2Component],
  providers: [Dispatcher, Store, Page1Service, Page2Service],
  bootstrap: [AppComponent]
})
export class AppModule { }