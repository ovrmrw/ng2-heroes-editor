import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import lodash from 'lodash';

import { Page2Service } from './page2.service';
import { Hero } from '../types';

import 'rxjs/add/operator/toPromise';

@Component({
  moduleId: module.id,
  selector: 'my-page2',
  template: `
    <h3>{{modeName}}</h3>

    <div *ngIf="hero && isAdding">
      <input [(ngModel)]="hero.id" >
      <input [(ngModel)]="hero.name" >
    </div>

    <div *ngIf="hero && !isAdding">
      {{hero.id}}
      <input [(ngModel)]="hero.name" >
      <pre>{{hero | json}}</pre>
    </div>

    <button (click)="save()" >Save</button>
  `,
  providers: [Page2Service],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page2Component implements OnInit {
  hero: Hero;
  isAdding: boolean = false;
  private _disSubs: Subscription[] = []; // disposable subscriptions
  set disSub(sub: Subscription) { this._disSubs.push(sub); }
  get disSubs() { return this._disSubs; }

  constructor(
    public service: Page2Service,
    public route: ActivatedRoute,
    public router: Router,
    public cd: ChangeDetectorRef
  ) {
    this.disSub = this.route.params.subscribe(params => {
      if (params['id']) {
        const id = +params['id'];
        this.disSub = this.service.heroes$.subscribe(heroes => {
          const selectedHero = heroes.find(hero => hero.id === id);
          if (selectedHero) {
            this.hero = selectedHero;
            this.cd.markForCheck();
          } else {
            alert('no hero for the explicit id.');
            this.router.navigate(['/page1']);
          }
        });
      } else {
        this.hero = new Hero();
        this.isAdding = true;
      }
    })
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.disSubs.length > 0) {
      this.disSubs.forEach(disSub => disSub.unsubscribe());
    }
  }


  save() {
    this.service.save(this.hero, this.isAdding);
    this.router.navigate(['/page1']);
  }

  get modeName() {
    if (this.isAdding) {
      return 'Adding Mode';
    } else {
      return 'Editing Mode';
    }
  }

}