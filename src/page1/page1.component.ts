import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Page1Service } from './page1.service';
import { Hero } from '../types';


@Component({
  moduleId: module.id,
  selector: 'my-page1',
  template: `
    <div>
      <ul>
        <li *ngFor="let hero of heroes | async">
          <div>
            <button class="btn btn-secondary" (click)="editHero(hero)">Edit</button>
            <button class="btn btn-warning" (click)="deleteHero(hero)">Delete</button>
            id: {{hero.id}} / name: {{hero.name}}
          </div>
        </li>
      </ul>
    </div>
    <div>
      <button class="btn btn-primary" (click)="addHero()">Add</button>
    </div>
  `,
  providers: [Page1Service],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page1Component implements OnInit {

  constructor(
    public service: Page1Service,
    public router: Router,
    public cd: ChangeDetectorRef
  ) { }

  ngOnInit() { }


  addHero() {
    this.router.navigate(['/page2']);
  }

  editHero(hero: Hero) {
    this.router.navigate(['/page2', hero.id]);
  }

  deleteHero(hero: Hero) {
    this.service.deleteHero(hero);
  }

  get heroes() { return this.service.heroes$; }

}