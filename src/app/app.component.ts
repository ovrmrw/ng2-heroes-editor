import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  // moduleId: module.id,
  selector: 'my-app',
  // template: `
  //   <h2>{{title}}</h2>
  //   <nav class="navbar navbar-light bg-faded">
  //     <ul class="nav navbar-nav">
  //       <li class="nav-item" routerLinkActive="active">
  //         <a class="nav-link" [routerLink]="['/page1']">HeroList</a>
  //       </li>
  //       <li class="nav-item" routerLinkActive="active">
  //         <a class="nav-link" [routerLink]="['/page2']">Add/Edit</a>
  //       </li>
  //     </ul>
  //   </nav>
  //   <router-outlet></router-outlet>
  // `,
  templateUrl: 'app.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'Heroes Editor';
}


/*
<li class="nav-item" routerLinkActive="active">
  <a class="nav-link" [routerLink]="['/page1']">HeroList</a>
</li>
<li class="nav-item" routerLinkActive="active">
  <a class="nav-link" [routerLink]="['/page2']">Add/Edit</a>
</li>
*/