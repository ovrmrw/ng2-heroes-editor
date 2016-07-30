import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'my-app',

  template: `
    <h2>{{title}}</h2>
    <nav class="navbar navbar-light bg-faded">
      <ul class="nav navbar-nav">
        <li class="nav-item" routerLinkActive="active">
          <a class="nav-link" [routerLink]="['/page1']">HeroList</a>
        </li>
        <li class="nav-item" routerLinkActive="active">
          <a class="nav-link "[routerLink]="['/page2']">Add/Edit</a>
        </li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
})
export class AppComponent {
  title = 'Heroes Editor';
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/