import { RouterModule, Routes } from '@angular/router';

import { Page1Component } from '../page1/page1.component';
import { Page2Component } from '../page2/page2.component';


const appRoutes: Routes = [
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

export const routing = RouterModule.forRoot(appRoutes);