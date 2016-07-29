import { provideRouter, RouterConfig } from '@angular/router';

// import { DashboardComponent } from '../dashboard/dashboard.component';
// import { HeroesComponent } from '../hero-list/heroes.component';
// import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { Page1Component } from '../page1/page1.component';
import { Page2Component } from '../page2/page2.component';


const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/page1',
    pathMatch: 'full'
  },
  {
    path: 'page1',
    component: Page1Component
  },
  {
    path: 'page2',
    component: Page2Component
  },
  {
    path: 'page2/:id',
    component: Page2Component
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/