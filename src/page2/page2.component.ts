import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import lodash from 'lodash';

import { Page2Service } from './page2.service';
import { Hero } from '../types';


@Component({
  moduleId: module.id,
  selector: 'my-page2',
  template: `
    <h3>{{modeName}}</h3>

    <form *ngIf="hero" (ngSubmit)="onSubmit()" #heroForm="ngForm">
      <div class="form-group row">
        <label for="id" class="col-xs-1 col-form-label">Id: </label>
        <div class="col-xs-11">
          <input class="form-control" type="number" id="id" [(ngModel)]="hero.id" name="id" #id="ngModel" required [disabled]="!isAdding" #spy>
          <div [hidden]="id.valid || id.pristine" class="alert alert-danger">
            Id is required
          </div>       
          <pre>className: {{spy.className}}</pre>   
        </div>
      </div>
      <div class="form-group row">
        <label for="name" class="col-xs-1 col-form-label">Name: </label>
        <div class="col-xs-11">
          <input class="form-control" type="text" id="name" [(ngModel)]="hero.name" name="name" #name="ngModel" required #spy>
          <div [hidden]="name.valid || name.pristine" class="alert alert-danger">
            Name is required
          </div>
          <pre>className: {{spy.className}}</pre>          
        </div>
      </div>
      <pre>{{hero | json}}</pre>
      <button type="submit" class="btn btn-outline-primary" [disabled]="!heroForm.form.valid">Submit</button>
    </form>    
  `,
  styles: [`
    .ng-valid[required] {
      border-left: 10px solid #42A948; /* green */
    }

    .ng-invalid {
      border-left: 10px solid #a94442; /* red */
    }
  `],
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
        this.service.heroes$.take(1).toPromise().then(heroes => {
          const selectedHero = heroes.find(hero => hero.id === id);
          if (selectedHero) {
            this.hero = selectedHero;
          } else {
            alert('no hero for the explicit id.');
            this.router.navigate(['/page1']);
          }
        });
      } else {
        this.hero = new Hero();
        this.isAdding = true;        
      }
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.disSubs.length > 0) {
      this.disSubs.forEach(disSub => disSub.unsubscribe());
    }
  }


  onSubmit() {
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